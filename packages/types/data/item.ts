export type Item = ProductItem | ElementItem;

interface ItemBase {
  id: number;
  name: string;
  type: 'product' | 'element';
  icon: string | null;
}

export interface ProductItem extends ItemBase {
  type: 'product';
  details: ProductDetails;
}

export interface ElementItem extends ItemBase {
  type: 'element';
  details: ElementDetails;
}

export interface Price {
  market: string;
  price_type: string;
  currency: string;
  amount_minor: number;
}

export interface Availability {
  market: string;
  stock_status: string;
  message: string | null;
  can_add_to_bag?: boolean | null;
  can_add_to_wishlist?: boolean | null;
  is_new?: boolean | null;
  on_sale?: boolean | null;
  vip_status?: string | null;
  vip_can_add_to_bag?: boolean | null;
  vip_can_add_to_wishlist?: boolean | null;
  max_order_quantity?: number | null;
}

export interface CommercePrices {
  item_id: number;
  language: string;
  market: string;
  prices: Price[];
}

export interface CommerceAvailability {
  item_id: number;
  market: string;
  language: string;
  availability: Availability[];
}

export interface ProductDetails {
  product_number: number;
  category_ids: string[];
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
  material: string | null;
}

export interface ElementDetails {
  design_id: string | null;
  color_id: number | null;
  category_id: number | null;
  subcategory_id: number | null;
  material: string | null;
  weight_grams: number | null;
}
