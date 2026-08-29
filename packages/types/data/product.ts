export interface Product {
  id: number;
  product_code: string;
  name: string;
  slug: string;
  brand_category: string;
  program_category: ProductProgramCategory | null;
  images: ProductImage[];
  product_types: ProductTaxonomy[];
  interests: ProductTaxonomy[];
  item_ids: number[];
}

export interface ProductProgramCategory {
  id: string;
  name: string;
  key: string | null;
}

export interface ProductImage {
  type: string;
  url: string;
}

export interface ProductTaxonomy {
  label: string;
  value: string;
}

export interface ProductCategory {
  id: string;
  type: 'product_type' | 'interest';
  source_id: string;
  name: string;
  product_ids: number[];
}
