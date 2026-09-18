import type { Color, ElementCategory, ElementDesign, ElementSubcategory, Element } from './data/element';
import type { CommerceAvailability, CommercePrices, Item } from './data/item';
import type { Product, ProductCategory, ProductInventory } from './data/product';
import type { SchemaVersion } from "./schema";

export type KnownUnauthorizedEndpoint =
  | '/v2'
  | '/v2.json'
  | '/v2/build'
  | '/v2/categories'
  | '/v2/colors'
  | '/v2/designs'
  | '/v2/subcategories'
  | '/v2/products'
  | `/v2/products/${number}/inventory`
  | '/v2/products/categories'
  | '/v2/items'
  | '/v2/commerce/prices'
  | '/v2/commerce/availability'
  | '/v2/elements';

export type KnownBulkExpandedEndpoint =
  | '/v2/commerce/prices'
  | '/v2/commerce/availability'
  | '/v2/categories'
  | '/v2/colors'
  | '/v2/designs'
  | '/v2/subcategories'
  | '/v2/products'
  | '/v2/products/categories'
  | '/v2/items'
  | '/v2/elements';

export type KnownLocalizedEndpoint =
  | '/v2/products'
  | '/v2/products/categories'
  | '/v2/items'
  | '/v2/elements'
  | '/v2/categories'
  | '/v2/colors'
  | '/v2/designs'
  | '/v2/subcategories'
  | '/v2/commerce/prices'
  | '/v2/commerce/availability';

export type KnownEndpoint = KnownUnauthorizedEndpoint | KnownBulkExpandedEndpoint | KnownLocalizedEndpoint;

// helper types for parameters
type CombineParameters<P1 extends string, P2 extends string> = `${P1}&${P2}` | `${P2}&${P1}`;
type WithParameters<Url extends string, Parameters extends string | undefined = undefined> =
  Parameters extends undefined ? Url : `${Url}?${Parameters}`;

// helper for paginated endpoints
type PaginationParameters = `page=${number}` | `page_size=${number}` | CombineParameters<`page=${number}`, `page_size=${number}`>;
type PaginatedEndpointUrl<Endpoint extends KnownEndpoint> = Endpoint | WithParameters<Endpoint, PaginationParameters>;

// helper types for bulk requests
type BulkExpandedQueryParameters =
  | `ids=${string}`
  | PaginationParameters
  | CombineParameters<`ids=${string}`, PaginationParameters>;
type BulkExpandedSingleEndpointUrl<Endpoint extends KnownBulkExpandedEndpoint, Id extends string | number> = `${Endpoint}/${Id}` | WithParameters<Endpoint, `id=${Id}`>
type BulkExpandedManyEndpointUrl<Endpoint extends KnownBulkExpandedEndpoint> = WithParameters<Endpoint, BulkExpandedQueryParameters>
type BulkExpandedEndpointUrl<Endpoint extends KnownBulkExpandedEndpoint, Id extends string | number> =
  Endpoint | BulkExpandedSingleEndpointUrl<Endpoint, Id> |  BulkExpandedManyEndpointUrl<Endpoint>;

type ProductCategoryEndpointUrl =
  | BulkExpandedEndpointUrl<'/v2/products/categories', string>
  | WithParameters<'/v2/products/categories', `type=${'product_type' | 'interest' | 'brand_category'}`>
  | WithParameters<'/v2/products/categories', CombineParameters<`type=${'product_type' | 'interest' | 'brand_category'}`, `ids=${string}`>>
  | WithParameters<'/v2/products/categories', CombineParameters<`type=${'product_type' | 'interest' | 'brand_category'}`, PaginationParameters>>
  | WithParameters<'/v2/products/categories', CombineParameters<`type=${'product_type' | 'interest' | 'brand_category'}`, CombineParameters<`ids=${string}`, PaginationParameters>>>;

type ItemEndpointUrl =
  | BulkExpandedEndpointUrl<'/v2/items', number>
  | WithParameters<'/v2/items', `type=${'product' | 'element'}`>
  | WithParameters<'/v2/items', CombineParameters<`type=${'product' | 'element'}`, `ids=${string}`>>
  | WithParameters<'/v2/items', CombineParameters<`type=${'product' | 'element'}`, PaginationParameters>>
  | WithParameters<'/v2/items', CombineParameters<`type=${'product' | 'element'}`, CombineParameters<`ids=${string}`, PaginationParameters>>>;

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

export type CommerceOptions = {
  /** Two- or three-letter market code, for example `US`. */
  market: string;
};

export type AuthenticatedOptions = {
  accessToken: string;
};

export type OptionsByEndpoint<Endpoint extends string> =
  Endpoint extends `/v2/commerce/${string}` ? Options & CommerceOptions & LocalizedOptions :
  Endpoint extends BulkExpandedEndpointUrl<KnownBulkExpandedEndpoint & KnownUnauthorizedEndpoint & KnownLocalizedEndpoint, string | number> ? Options & LocalizedOptions :
  Endpoint extends BulkExpandedEndpointUrl<KnownBulkExpandedEndpoint & KnownLocalizedEndpoint, string | number> ? Options & LocalizedOptions :
  Endpoint extends KnownLocalizedEndpoint ? Options & LocalizedOptions :
  Endpoint extends KnownEndpoint | BulkExpandedEndpointUrl<KnownBulkExpandedEndpoint, string | number> ? Options :
  Partial<AuthenticatedOptions & LocalizedOptions>;

type EndpointTypeBulk<Url extends string, Schema extends SchemaVersion> =
  Url extends BulkExpandedEndpointUrl<'/v2/products', number> ? BulkExpandedResponseType<'/v2/products', Url, number, Product> :
  Url extends ProductCategoryEndpointUrl ? BulkExpandedResponseType<'/v2/products/categories', Url, string, ProductCategory> :
  Url extends ItemEndpointUrl ? BulkExpandedResponseType<'/v2/items', Url, number, Item> :
  Url extends BulkExpandedEndpointUrl<'/v2/elements', number> ? BulkExpandedResponseType<'/v2/elements', Url, number, Element<Schema>> :
  Url extends BulkExpandedEndpointUrl<'/v2/categories', number> ? BulkExpandedResponseType<'/v2/categories', Url, number, ElementCategory> :
  Url extends BulkExpandedEndpointUrl<'/v2/colors', number> ? BulkExpandedResponseType<'/v2/colors', Url, number, Color<Schema>> :
  Url extends BulkExpandedEndpointUrl<'/v2/designs', number> ? BulkExpandedResponseType<'/v2/designs', Url, number, ElementDesign> :
  Url extends BulkExpandedEndpointUrl<'/v2/subcategories', number> ? BulkExpandedResponseType<'/v2/subcategories', Url, number, ElementSubcategory> :
  Url extends BulkExpandedEndpointUrl<'/v2/commerce/prices', number> ? BulkExpandedResponseType<'/v2/commerce/prices', Url, number, CommercePrices> :
  Url extends BulkExpandedEndpointUrl<'/v2/commerce/availability', number> ? BulkExpandedResponseType<'/v2/commerce/availability', Url, number, CommerceAvailability> :
  Url extends BulkExpandedEndpointUrl<KnownBulkExpandedEndpoint, string | number> ? BulkExpandedResponseType<KnownBulkExpandedEndpoint, Url, string | number, unknown> :
  unknown;

// result type for endpoint
export type EndpointType<Url extends KnownEndpoint | (string & {}), Schema extends SchemaVersion = undefined> =
  Url extends '/v2' | '/v2.json' ? string[] :
  Url extends '/v2/build' ? { id: string } :
  Url extends `/v2/products/${number}/inventory` ? ProductInventory :
  EndpointTypeBulk<Url, Schema>;

export type ValidateEndpointUrl<T extends string> = unknown extends EndpointType<T> ? 'unknown endpoint url' : T;
