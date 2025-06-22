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
    /** The subtype of this product */
    type?: string;
  }
}

export type ProductFlag = 'NoFigures' | 'ShowInCatalog';
