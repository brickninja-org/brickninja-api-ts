import type { Item } from './data/item';
import type { Product, ProductCategory } from './data/product';
import type { Element, ElementCategory } from './data/element';
import type { EndpointType, LocalizedOptions, OptionsByEndpoint } from './endpoints';

type Equal<Left, Right> =
  (<T>() => T extends Left ? 1 : 2) extends
  (<T>() => T extends Right ? 1 : 2) ? true : false;
type Assert<T extends true> = T;

type ProductDetail = Assert<Equal<EndpointType<'/v2/products/123'>, Product>>;
type ProductCollection = Assert<Equal<EndpointType<'/v2/products'>, number[]>>;
type ProductExpanded = Assert<Equal<EndpointType<'/v2/products?ids=1,2'>, Product[]>>;
type ProductPaginated = Assert<Equal<EndpointType<'/v2/products?page=0'>, number[]>>;

type CategoryDetail = Assert<Equal<EndpointType<'/v2/products/categories/product_type:brick'>, ProductCategory>>;
type CategoryFiltered = Assert<Equal<EndpointType<'/v2/products/categories?type=interest&ids=all'>, ProductCategory[]>>;

type ItemDetail = Assert<Equal<EndpointType<'/v2/items/42'>, Item>>;
type ItemFiltered = Assert<Equal<EndpointType<'/v2/items?type=Element&page=0'>, number[]>>;
type ItemExpanded = Assert<Equal<EndpointType<'/v2/items?ids=42&type=Element'>, Item[]>>;

type Build = Assert<Equal<EndpointType<'/v2/build'>, { id: string }>>;
type ElementDetail = Assert<Equal<EndpointType<'/v2/elements/42'>, Element>>;
type ElementCategoryDetail = Assert<Equal<EndpointType<'/v2/elements/categories/42'>, ElementCategory>>;

const localized: OptionsByEndpoint<'/v2/products/123'> = { language: 'fr' } satisfies LocalizedOptions;
void localized;
