import type { Color, ElementCategory, ElementDesign, ElementSubcategory, Element } from './data/element';
import type { Item } from './data/item';
import type { Product, ProductCategory } from './data/product';
import type { SchemaVersion } from "./schema";

export type KnownUnauthorizedEndpoint =
  | '/v2'
  | '/v2.json'
  | '/v2/build'
  | '/v2/products'
  | `/v2/products/${string}`
  | '/v2/products/categories'
  | `/v2/products/categories/${string}`
  | '/v2/items'
  | `/v2/items/${string}`
  | '/v2/elements'
  | `/v2/elements/${string}`
  | '/v2/elements/colors'
  | `/v2/elements/colors/${string}`
  | '/v2/elements/categories'
  | `/v2/elements/categories/${string}`
  | '/v2/elements/designs'
  | `/v2/elements/designs/${string}`
  | '/v2/elements/subcategories'
  | `/v2/elements/subcategories/${string}`;

export type KnownBulkExpandedEndpoint =
  | '/v2/products'
  | '/v2/products/categories'
  | '/v2/items'
  | '/v2/elements'
  | '/v2/elements/colors'
  | '/v2/elements/categories'
  | '/v2/elements/designs'
  | '/v2/elements/subcategories';

export type KnownLocalizedEndpoint =
  | '/v2/products'
  | `/v2/products/${string}`
  | '/v2/products/categories'
  | `/v2/products/categories/${string}`
  | '/v2/items'
  | `/v2/items/${string}`
  | '/v2/elements'
  | `/v2/elements/${string}`
  | '/v2/elements/colors'
  | `/v2/elements/colors/${string}`
  | '/v2/elements/categories'
  | `/v2/elements/categories/${string}`
  | '/v2/elements/designs'
  | `/v2/elements/designs/${string}`
  | '/v2/elements/subcategories'
  | `/v2/elements/subcategories/${string}`;

export type KnownEndpoint = KnownUnauthorizedEndpoint | KnownBulkExpandedEndpoint | KnownLocalizedEndpoint;

// helper types for parameters
type CombineParameters<P1 extends string, P2 extends string> = `${P1}&${P2}` | `${P2}&${P1}`;
type WithParameters<Url extends string, Parameters extends string | undefined = undefined> =
  Parameters extends undefined ? Url : `${Url}?${Parameters}`;

// helper for paginated endpoints
type PaginationParameters = `page=${number}` | `page_size=${number}` | CombineParameters<`page=${number}`, `page_size=${number}`>;
type BulkExpandedQueryParameters =
  | `ids=${string}`
  | PaginationParameters
  | CombineParameters<`ids=${string}`, PaginationParameters>;
type PaginatedEndpointUrl<Endpoint extends KnownEndpoint> = Endpoint | WithParameters<Endpoint, PaginationParameters>;

// helper types for bulk requests
type BulkExpandedSingleEndpointUrl<Endpoint extends KnownBulkExpandedEndpoint, Id extends string | number> = `${Endpoint}/${Id}` | WithParameters<Endpoint, `id=${Id}`>
type BulkExpandedManyEndpointUrl<Endpoint extends KnownBulkExpandedEndpoint> = WithParameters<Endpoint, BulkExpandedQueryParameters>
type BulkExpandedEndpointUrl<Endpoint extends KnownBulkExpandedEndpoint, Id extends string | number> =
  Endpoint | BulkExpandedSingleEndpointUrl<Endpoint, Id> |  BulkExpandedManyEndpointUrl<Endpoint>;

type ProductCategoryEndpointUrl =
  | BulkExpandedEndpointUrl<'/v2/products/categories', string>
  | WithParameters<'/v2/products/categories', `type=${'product_type' | 'interest'}`>
  | WithParameters<'/v2/products/categories', CombineParameters<`type=${'product_type' | 'interest'}`, `ids=${string}`>>
  | WithParameters<'/v2/products/categories', CombineParameters<`type=${'product_type' | 'interest'}`, PaginationParameters>>
  | WithParameters<'/v2/products/categories', CombineParameters<`type=${'product_type' | 'interest'}`, CombineParameters<`ids=${string}`, PaginationParameters>>>;

type ItemEndpointUrl =
  | BulkExpandedEndpointUrl<'/v2/items', number>
  | WithParameters<'/v2/items', `type=${'Product' | 'Element'}`>
  | WithParameters<'/v2/items', CombineParameters<`type=${'Product' | 'Element'}`, `ids=${string}`>>
  | WithParameters<'/v2/items', CombineParameters<`type=${'Product' | 'Element'}`, PaginationParameters>>
  | WithParameters<'/v2/items', CombineParameters<`type=${'Product' | 'Element'}`, CombineParameters<`ids=${string}`, PaginationParameters>>>;

type BulkExpandedResponseType<Endpoint extends KnownBulkExpandedEndpoint, Url extends string, Id extends string | number, T> =
  // base endpoint returns a list of ids
  Url extends Endpoint ? Id[] :
  // make sure the id does not include a slash (if there are sub-endpoints, they have to be listed first in `EndpointType`)
  Url extends `${Endpoint}/${Id}/${string}` ? unknown :
  // handle single id requests (`endpoint/:id` and `endpoint?id=:id`)
  Url extends BulkExpandedSingleEndpointUrl<Endpoint, Id> ? T :
  // handle multiple id requests (either `endpoint?ids=:ids` or paginated)
  Url extends `${Endpoint}?${infer Parameters}` ? Parameters extends `${string}ids=${string}` ? T[] : Id[] :
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
  Endpoint extends BulkExpandedEndpointUrl<KnownBulkExpandedEndpoint & KnownLocalizedEndpoint, string | number> ? Options & LocalizedOptions :
  Endpoint extends KnownLocalizedEndpoint ? Options & LocalizedOptions :
  Endpoint extends KnownEndpoint | BulkExpandedEndpointUrl<KnownBulkExpandedEndpoint, string | number> ? Options :
  Partial<AuthenticatedOptions & LocalizedOptions>;

// result type for endpoint
export type EndpointType<Url extends KnownEndpoint | (string & {}), Schema extends SchemaVersion = undefined> =
  Url extends '/v2' | '/v2.json' ? string[] :
  Url extends '/v2/build' ? { id: string } :
  Url extends BulkExpandedEndpointUrl<'/v2/products', number> ? BulkExpandedResponseType<'/v2/products', Url, number, Product> :
  Url extends ProductCategoryEndpointUrl ? BulkExpandedResponseType<'/v2/products/categories', Url, string, ProductCategory> :
  Url extends ItemEndpointUrl ? BulkExpandedResponseType<'/v2/items', Url, number, Item> :
  Url extends BulkExpandedEndpointUrl<'/v2/elements', number> ? BulkExpandedResponseType<'/v2/elements', Url, number, Element<Schema>> :
  Url extends BulkExpandedEndpointUrl<'/v2/elements/colors', number> ? BulkExpandedResponseType<'/v2/elements/colors', Url, number, Color<Schema>> :
  Url extends BulkExpandedEndpointUrl<'/v2/elements/categories', number> ? BulkExpandedResponseType<'/v2/elements/categories', Url, number, ElementCategory> :
  Url extends BulkExpandedEndpointUrl<'/v2/elements/designs', number> ? BulkExpandedResponseType<'/v2/elements/designs', Url, number, ElementDesign> :
  Url extends BulkExpandedEndpointUrl<'/v2/elements/subcategories', number> ? BulkExpandedResponseType<'/v2/elements/subcategories', Url, number, ElementSubcategory> :
  Url extends `/v2/products/categories/${string}` ? ProductCategory :
  Url extends `/v2/products/${string}` ? Product :
  Url extends `/v2/items/${string}` ? Item :
  Url extends `/v2/elements/colors/${string}` ? Color<Schema> :
  Url extends `/v2/elements/categories/${string}` ? ElementCategory :
  Url extends `/v2/elements/designs/${string}` ? ElementDesign :
  Url extends `/v2/elements/subcategories/${string}` ? ElementSubcategory :
  Url extends `/v2/elements/${string}` ? Element<Schema> :
  // fallback for all bulk expanded urls
  Url extends BulkExpandedEndpointUrl<KnownBulkExpandedEndpoint, string | number> ? BulkExpandedResponseType<KnownBulkExpandedEndpoint, Url, string | number, unknown> :
  // fallback for all other urls
  unknown;

export type ValidateEndpointUrl<T extends string> = unknown extends EndpointType<T> ? 'unknown endpoint url' : T;
