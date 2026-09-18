import type { CommerceAvailability, CommercePrices, Item } from './data/item';
import type { Product, ProductCategory, ProductInventory } from './data/product';
import type { Color, Element, ElementCategory, ElementDesign, ElementSubcategory } from './data/element';
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
type ItemFiltered = Assert<Equal<EndpointType<'/v2/items?type=element&page=0'>, number[]>>;
type ItemExpanded = Assert<Equal<EndpointType<'/v2/items?ids=42&type=element'>, Item[]>>;

type Build = Assert<Equal<EndpointType<'/v2/build'>, { id: string }>>;
type ProductInventoryResponse = Assert<Equal<EndpointType<'/v2/products/10280/inventory'>, ProductInventory>>;
type ElementDetail = Assert<Equal<EndpointType<'/v2/elements/42'>, Element>>;
type ElementCategoryDetail = Assert<Equal<EndpointType<'/v2/categories/42'>, ElementCategory>>;
type ColorDetail = Assert<Equal<EndpointType<'/v2/colors/1'>, Color>>;
type DesignDetail = Assert<Equal<EndpointType<'/v2/designs/1056'>, ElementDesign>>;
type SubcategoryDetail = Assert<Equal<EndpointType<'/v2/subcategories/1'>, ElementSubcategory>>;

type CategoryCollection = Assert<Equal<EndpointType<'/v2/categories'>, number[]>>;
type ColorCollection = Assert<Equal<EndpointType<'/v2/colors?ids=1'>, Color[]>>;
type DesignCollection = Assert<Equal<EndpointType<'/v2/designs?page=0'>, number[]>>;
type SubcategoryCollection = Assert<Equal<EndpointType<'/v2/subcategories/1'>, ElementSubcategory>>;
type CommercePricesDetail = Assert<Equal<EndpointType<'/v2/commerce/prices/6332921'>, CommercePrices>>;
type CommerceAvailabilityDetail = Assert<Equal<EndpointType<'/v2/commerce/availability/6332921'>, CommerceAvailability>>;
type CommercePricesExpanded = Assert<Equal<EndpointType<'/v2/commerce/prices?ids=6332921'>, CommercePrices[]>>;
type CommerceAvailabilityExpanded = Assert<Equal<EndpointType<'/v2/commerce/availability?id=6332921'>, CommerceAvailability>>;

const localized: OptionsByEndpoint<'/v2/products/123'> = { language: 'fr' } satisfies LocalizedOptions;
const localizedCategory: OptionsByEndpoint<'/v2/categories'> = { language: 'nl' } satisfies LocalizedOptions;
const commerce: OptionsByEndpoint<'/v2/commerce/prices/6332921'> = { market: 'US', language: 'en' };
void localized;
void localizedCategory;
void commerce;
