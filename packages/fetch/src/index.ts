import type { AuthenticatedOptions, EndpointType, KnownEndpoint, LocalizedOptions, OptionsByEndpoint } from '@brickninjaapi/types/endpoints';
import type { SchemaVersion } from '@brickninjaapi/types/schema';

type RequiredKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? never : K }[keyof T];

// if OptionsByEndpoint<Url> has no required keys, make the options parameter optional
type Args<Url extends string, Schema extends SchemaVersion> = RequiredKeys<OptionsByEndpoint<Url>> extends never
  ? [endpoint: Url, options?: FetchBrickNinjaApiOptions<Schema> & OptionsByEndpoint<Url> & FetchOptions]
  : [endpoint: Url, options: FetchBrickNinjaApiOptions<Schema> & OptionsByEndpoint<Url> & FetchOptions]

export async function fetchBrickNinjaApi<
  Url extends KnownEndpoint | (string & {}),
  Schema extends SchemaVersion = undefined
>(
  ...[endpoint, options]: Args<Url, Schema>
): Promise<EndpointType<Url, Schema>> {
  const resolvedOptions: FetchBrickNinjaApiOptions<Schema> & Partial<OptionsByEndpoint<Url> & FetchOptions> = options ?? {};
  const url = new URL(endpoint, 'https://api.brick.ninja/');

  if(resolvedOptions.schema) {
    url.searchParams.set('v', resolvedOptions.schema);
  }
  const language = (resolvedOptions as Partial<LocalizedOptions>).language;
  if(typeof language === 'string') {
    url.searchParams.set('lang', language);
  }
  const accessToken = (resolvedOptions as Partial<AuthenticatedOptions>).accessToken;
  if(typeof accessToken === 'string') {
    url.searchParams.set('access_token', accessToken);
  }

  // build request
  let request = new Request(url, {
    // The brick.ninja API never uses redirects, so we want to error if we encounter one.
    // We use `manual` instead of `error` here so we can throw our own `BrickNinjaApiError` with the response attached
    redirect: 'manual',

    // set signal and cache from options
    signal: resolvedOptions.signal,
    cache: resolvedOptions.cache
  });

  // if there is a onRequest handler registered, let it modify the request
  if(resolvedOptions.onRequest) {
    request = await resolvedOptions.onRequest(request);

    if(!(request instanceof Request)) {
      throw new Error(`onRequest has to return a Request`);
    }
  }

  // call the API
  const response = await fetch(request);

  // call onResponse handler
  await resolvedOptions.onResponse?.(response);

  // check if the response is json (`application/json; charset=utf-8`)
  const isJson = response.headers.get('content-type')?.startsWith('application/json') ?? false;

  // censor access token in url to not leak it in error messages
  const erroredUrl = typeof accessToken === 'string'
    ? url.toString().replace(accessToken, '***')
    : url.toString();

  // check if the response is an error
  if(!response.ok) {
    // if the response is JSON, it might have more details in the `text` prop
    if(isJson) {
      const error: unknown = await response.json();

      if(typeof error === 'object' && error !== null && 'text' in error) {
        const errorText = (error as { text?: unknown }).text;

        if(typeof errorText === 'string') {
          throw new BrickNinjaApiError(`The brick.ninja API call to '${erroredUrl}' returned ${response.status} ${response.statusText}: ${errorText}.`, response);
        }
      }
    }

    // otherwise just throw error with the status code
    throw new BrickNinjaApiError(`The brick.ninja API call to '${erroredUrl}' returned ${response.status} ${response.statusText}.`, response);
  }

  // if the response is not JSON, throw an error
  if(!isJson) {
    throw new BrickNinjaApiError(`The brick.ninja API call to '${erroredUrl}' did not respond with a JSON response`, response);
  }

  // parse json
  const json = await response.json();

  // check that json is not `["v1", "v2"]` which sometimes happens for authenticated endpoints
  if(url.toString() !== 'https://api.brick.ninja/' && Array.isArray(json) && json.length === 2 && json[0] === 'v1' && json[1] === 'v2') {
    throw new BrickNinjaApiError(`The brick.ninja API call to '${erroredUrl}' did returned an invalid response (["v1", "v2"])`, response);
  }

  // TODO: catch more errors

  return json;
}

export type FetchBrickNinjaApiOptions<Schema extends SchemaVersion> = {
  /** The schema to use when making the API request */
  schema?: Schema;

  /** onRequest handler allows to modify the request made to the Guild Wars 2 API. */
  onRequest?: (request: Request) => Request | Promise<Request>;

  /**
   * onResponse handler. Called for all responses, successful or not.
   * Make sure to clone the response in case of consuming the body.
   */
  onResponse?: (response: Response) => void | Promise<void>;
}

export type FetchOptions = {
  /** @see https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal */
  signal?: AbortSignal,

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/Request/cache */
  cache?: RequestCache,
}

export class BrickNinjaApiError extends Error {
  constructor(message: string, public response: Response) {
    super(message);
    this.name = 'BrickNinjaApiError';
  }
}
