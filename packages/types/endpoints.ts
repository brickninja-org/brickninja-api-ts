import type { Createsubtoken } from './data/createsubtoken';
import type { Color, ElementCategory, ElementDesign, ElementSubcategory } from './data/element';
import type { Theme } from './data/set';
import type { Tokeninfo } from './data/tokeninfo';
import type { SchemaVersion } from "./schema";

export type KnownAuthenticatedEndpoint =
  | '/v2/account'
  | '/v2/createsubtoken';

export type KnownUnauthorizedEndpoint =
  | '/v2/build'
  | '/v2/elements/colors'
  | '/v2/elements/categories'
  | '/v2/elements/designs'
  | '/v2/elements/subcategories'
  | '/v2/sets/themes';

export type KnownBulkExpandedEndpoint =
  | '/v2/elements/colors'
  | '/v2/elements/categories'
  | '/v2/elements/designs'
  | '/v2/elements/subcategories'
  | '/v2/sets/themes';

export type KnownLocalizedEndpoint =
  | '/v2/sets/themes';

export type KnownEndpoint = KnownAuthenticatedEndpoint | KnownUnauthorizedEndpoint | KnownBulkExpandedEndpoint | KnownLocalizedEndpoint;

// helper types for parameters
type CombineParameters<P1 extends string, P2 extends string> = `${P1}&${P2}` | `${P2}&${P1}`;
type WithParameters<Url extends string, Parameters extends string | undefined = undefined> =
  Parameters extends undefined ? Url : `${Url}?${Parameters}`;

// helper for paginated endpoints
type PaginationParameters = `page=${number}` | `page_size=${number}` | CombineParameters<`page=${number}`, `page_size=${number}`>;
type PaginatedEndpointUrl<Endpoint extends KnownEndpoint> = Endpoint | WithParameters<Endpoint, PaginationParameters>;

// helper types for bulk requests
type BulkExpandedSingleEndpointUrl<Endpoint extends KnownBulkExpandedEndpoint, Id extends string | number> = `${Endpoint}/${Id}` | WithParameters<Endpoint, `id=${Id}`>
type BulkExpandedManyEndpointUrl<Endpoint extends KnownBulkExpandedEndpoint> = WithParameters<Endpoint, `ids=${string}` | PaginationParameters>
type BulkExpandedEndpointUrl<Endpoint extends KnownBulkExpandedEndpoint, Id extends string | number> =
  Endpoint | BulkExpandedSingleEndpointUrl<Endpoint, Id> |  BulkExpandedManyEndpointUrl<Endpoint>;

type BulkExpandedResponseType<Endpoint extends KnownBulkExpandedEndpoint, Url extends string, Id extends string | number, T> =
  // base endpoint returns a list of ids
  Url extends Endpoint ? Id[] :
  // make sure the id does not include a slash (if there are sub-endpoints, they have to be listed first in `EndpointType`)
  Url extends `${Endpoint}/${Id}/${string}` ? unknown :
  // handle single id requests (`endpoint/:id` and `endpoint?id=:id`)
  Url extends BulkExpandedSingleEndpointUrl<Endpoint, Id> ? T :
  // handle multiple id requests (either `endpoint?ids=:ids` or paginated)
  Url extends BulkExpandedManyEndpointUrl<Endpoint> ? T[] :
  // otherwise this is not a known bulk request
  unknown;

// /v2/createsubtoken request
type CreateSubtokenUrl<Url extends KnownEndpoint> =
  | WithParameters<Url, CombineParameters<`expire=${string}`, CombineParameters<`permissions=${string}`, `urls=${string}`>>>
  | WithParameters<Url, CombineParameters<`expire=${string}`, `permissions=${string}`>>
  | WithParameters<Url, CombineParameters<`expire=${string}`, `urls=${string}`>>
  | WithParameters<Url, CombineParameters<`permissions=${string}`, `urls=${string}`>>
  | WithParameters<Url, `expire=${string}`>
  | WithParameters<Url, `permissions=${string}`>
  | WithParameters<Url, `urls=${string}`>
  | Url;

  // options
type Options = {};

export type LocalizedOptions = {
  language?: 'de' | 'en' | 'nl';
};

export type AuthenticatedOptions = {
  accessToken: string;
};

export type OptionsByEndpoint<Endpoint extends string> =
  Endpoint extends BulkExpandedEndpointUrl<KnownBulkExpandedEndpoint & KnownUnauthorizedEndpoint & KnownLocalizedEndpoint, string | number> ? Options & LocalizedOptions :
  Endpoint extends BulkExpandedEndpointUrl<KnownBulkExpandedEndpoint & KnownAuthenticatedEndpoint & KnownLocalizedEndpoint, string | number> ? Options & AuthenticatedOptions & LocalizedOptions :
  Endpoint extends BulkExpandedEndpointUrl<KnownBulkExpandedEndpoint & KnownLocalizedEndpoint, string | number> ? Options & LocalizedOptions :
  Endpoint extends BulkExpandedEndpointUrl<KnownBulkExpandedEndpoint & KnownAuthenticatedEndpoint, string | number> ? Options & AuthenticatedOptions :
  Endpoint extends KnownAuthenticatedEndpoint & KnownLocalizedEndpoint ? Options & AuthenticatedOptions & LocalizedOptions :
  Endpoint extends KnownAuthenticatedEndpoint ? Options & AuthenticatedOptions :
  Endpoint extends KnownLocalizedEndpoint ? Options & LocalizedOptions :
  Endpoint extends CreateSubtokenUrl<'/v2/createsubtoken'> ? Options & AuthenticatedOptions :
  Endpoint extends KnownEndpoint | BulkExpandedEndpointUrl<KnownBulkExpandedEndpoint, string | number> ? Options :
  Partial<AuthenticatedOptions & LocalizedOptions>;

// result type for endpoint
export type EndpointType<Url extends KnownEndpoint | (string & {}), Schema extends SchemaVersion = undefined> =
  Url extends '/v2/account' ? { id: number } :
  Url extends CreateSubtokenUrl<'/v2/createsubtoken'> ? Createsubtoken :
  Url extends BulkExpandedEndpointUrl<'/v2/elements/colors', number> ? BulkExpandedResponseType<'/v2/elements/colors', Url, number, Color<Schema>> :
  Url extends BulkExpandedEndpointUrl<'/v2/elements/categories', number> ? BulkExpandedResponseType<'/v2/elements/categories', Url, number, ElementCategory> :
  Url extends BulkExpandedEndpointUrl<'/v2/elements/designs', number> ? BulkExpandedResponseType<'/v2/elements/designs', Url, number, ElementDesign> :
  Url extends BulkExpandedEndpointUrl<'/v2/elements/subcategories', number> ? BulkExpandedResponseType<'/v2/elements/subcategories', Url, number, ElementSubcategory> :
  Url extends BulkExpandedEndpointUrl<'/v2/sets/themes', number> ? BulkExpandedResponseType<'/v2/sets/themes', Url, number, Theme> :
  Url extends '/v2/tokeninfo' ? Tokeninfo<Schema> :
  // fallback for all bulk expanded urls
  Url extends BulkExpandedEndpointUrl<KnownBulkExpandedEndpoint, string | number> ? BulkExpandedResponseType<KnownBulkExpandedEndpoint, Url, string | number, unknown> :
  // fallback for all other urls
  unknown;

export type ValidateEndpointUrl<T extends string> = unknown extends EndpointType<T> ? 'unknown endpoint url' : T;
