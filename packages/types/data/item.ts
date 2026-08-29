export type Item = ProductItem | ElementItem;

interface ItemBase {
  id: number;
  type: 'Product' | 'Element';
  name: string;
  icon: string | null;
  source_id: string;
  product_id: number | null;
  element_id: string | null;
  sku: string | null;
  prices: Price[];
  availability: Availability[];
}

export interface ProductItem extends ItemBase {
  type: 'Product';
  details: ProductDetails;
}

export interface ElementItem extends ItemBase {
  type: 'Element';
  details: ElementDetails;
}

export interface Price {
  locale: string;
  price_type: string;
  currency: string;
  amount_minor: number;
}

export interface Availability {
  locale: string;
  stock_status: string;
  availability_text?: string | null;
  can_add_to_bag?: boolean | null;
  can_add_to_wishlist?: boolean | null;
  is_new?: boolean | null;
  on_sale?: boolean | null;
  vip_status?: string | null;
  vip_text?: string | null;
  vip_can_add_to_bag?: boolean | null;
  vip_can_add_to_wishlist?: boolean | null;
  max_order_quantity?: number | null;
}

export interface ProductDetails {
  product_number: number;
  theme_ids: number[];
  item_ids: number[];
  piece_count: number | null;
  age_min: number | null;
  age_range: string | null;
  minifigure_count: number | null;
  build_height: number | null;
  build_width: number | null;
  build_depth: number | null;
  program_bricks_count: number | null;
  program_minifigures_count: number | null;
  program_tags_count: number | null;
  program_has_charger: boolean | null;
  program_play_type: string | null;
  size_options: string[];
  weight_grams: number | null;
  flags: string[];
  material?: string | null;
}

export interface ElementDetails {
  design_id: string | null;
  color_id: string | null;
  color_name: string | null;
  color_family_id: string | null;
  color_family: string | null;
  category_id: string | null;
  subcategory_id: string | null;
  material: string | null;
  weight_grams: number | null;
}
