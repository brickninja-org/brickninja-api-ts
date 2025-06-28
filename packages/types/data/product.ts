/**
 * Product as returned from `/v1/products` endpoint.
 * @see TODO: Update this type when the API changes.
 */
export interface Product {
  /** The id of the poduct */
  id: number;

  /** The name of the product */
  name: string;

  /** The description of the product */
  description?: string;

  /** The image URL of the product */
  icon?: string;

  /** The categories of the product */
  categories?: number[];

  /** Flags of the product */
  flags?: ProductFlag[];

  itemIds?: number[];

  /** Product type */
  type?: 'Set' | 'Figure';

  /** Product details */
  details?: {
    /** The attributes of this product */
    attributes?: ProductAttribute[];
    /** The subtype of this product */
    type?: string;
  }

  /** The barcodes of the product */
  barcodes?: Barcode[];

  /** The region information for the product */
  region_info?: RegionInfo;
}

export type ProductFlag = 'NoFigures' | 'ShowInCatalog';

export type ProductAttribute = {
  /** The label of the attribute */
  text: string;
  /** The type of the attribute */
  type: 'ageRange' | 'dimensionsInMillimeters' | 'figureCount' | 'pieceCount' | 'weightInGrams'
  /** The value of the attribute */
  value: string | number | Array<string | number>;
}

export type Barcode = {
  /** The type of the barcode */
  type: 'UPC' | 'EAN' | 'ISBN' | 'QR';
  /** The value of the barcode */
  value: string;
}

export type RegionInfo = Record<'CA' | 'DE' | 'GB' | 'US', {
  /** The recommended retail price */
  price: number;
  /** The release date */
  release: Date;
  /** The insider points for the product */
  points?: number;
}>;

export interface ProductCategory {
  /** The category id */
  id: number;

  /** The name of the category */
  name: string;
}
