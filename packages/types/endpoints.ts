import type { Color } from "./data/color";
import type { Element } from './data/element';
import type { ElementCategory } from "./data/element-category";
import type { ElementDesign } from "./data/element-design";
import type { ElementGroup } from "./data/element-group";
import type { Item } from "./data/item";
import type { Product, ProductCategory, ProductInventoryList } from "./data/product";
import type { SchemaVersion } from "./schema";

export type KnownAuthenticatedEndpoint =
  | '/v1/account';

export type KnownUnauthorizedEndpoint =
  | '/v1/build'
  | '/v1/colors'
  | '/v1/elements'
  | '/v1/elements/categories'
  | '/v1/elements/designs'
  | '/v1/elements/groups'
  | '/v1/items'
  | '/v1/items/${string}/container-contents'
  | '/v1/products/${string}/inventory-list'
  | '/v1/products/categories'
  | '/v1/products';

export type KnownBulkExpandedEndpoint =
  | '/v1/colors'
  | '/v1/elements/categories'
  | '/v1/elements/designs'
  | '/v1/elements/groups'
  | '/v1/elements'
  | '/v1/items'
  | '/v1/products/categories'
  | '/v1/products';

export type KnownLocalizedEndpoint =
  | '/v1/colors'
  | '/v1/elements'
  | '/v1/elements/categories'
  | '/v1/elements/groups'
  | '/v1/items'
  | '/v1/products/categories'
  | '/v1/products';

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

// options
type Options = {};

export type LocalizedOptions = {
  language?: 'de' | 'en' | 'es' | 'fr' | 'nl';
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
  Endpoint extends KnownEndpoint | BulkExpandedEndpointUrl<KnownBulkExpandedEndpoint, string | number> ? Options :
  Partial<AuthenticatedOptions & LocalizedOptions>;

// result type for endpoint
export type EndpointType<Url extends KnownEndpoint | (string & {}), Schema extends SchemaVersion = undefined> =
  Url extends `/v1/items/${string}/container-contents` ? { id: number; item_id: number; quantity: number; }[] :
  Url extends `/v1/products/${string}/inventory-list` ? ProductInventoryList :
  Url extends BulkExpandedEndpointUrl<'/v1/colors', number> ? BulkExpandedResponseType<'/v1/colors', Url, number, Color> :
  Url extends BulkExpandedEndpointUrl<'/v1/elements/categories', number> ? BulkExpandedResponseType<'/v1/elements/categories', Url, number, ElementCategory> :
  Url extends BulkExpandedEndpointUrl<'/v1/elements/designs', number> ? BulkExpandedResponseType<'/v1/elements/designs', Url, number, ElementDesign> :
  Url extends BulkExpandedEndpointUrl<'/v1/elements/groups', number> ? BulkExpandedResponseType<'/v1/elements/groups', Url, number, ElementGroup> :
  Url extends BulkExpandedEndpointUrl<'/v1/elements', number> ? BulkExpandedResponseType<'/v1/elements', Url, number, Element> :
  Url extends BulkExpandedEndpointUrl<'/v1/items', number> ? BulkExpandedResponseType<'/v1/items', Url, number, Item<Schema>> :
  Url extends BulkExpandedEndpointUrl<'/v1/products/categories', number> ? BulkExpandedResponseType<'/v1/products/categories', Url, number, ProductCategory> :
  Url extends BulkExpandedEndpointUrl<'/v1/products', number> ? BulkExpandedResponseType<'/v1/products', Url, number, Product> :
  // fallback for all bulk expanded urls
  Url extends BulkExpandedEndpointUrl<KnownBulkExpandedEndpoint, string | number> ? BulkExpandedResponseType<KnownBulkExpandedEndpoint, Url, string | number, unknown> :
  // fallback for all other urls
  unknown;

export type ValidateEndpointUrl<T extends string> = unknown extends EndpointType<T> ? 'unknown endpoint url' : T;
