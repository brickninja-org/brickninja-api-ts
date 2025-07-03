/**
 * Product as returned from `/v1/elements` endpoint.
 * @see TODO: Update this type when the API changes.
 */
export interface Element {
  /** The id of the element */
  id: number;

  /** The name of the element */
  name: string;

  /** The image URL of the element */
  icon?: string;

  /** The type of the item  */
  type: 'Element';

  /** Element details */
  details?: {
    /** The color of the element */
    color_id?: number;

    /** The design id of the element */
    design_id?: number;

    /** The piece type of the element */
    type?: 'DUPLO' | 'LEGO' | 'TECHNIC';

    /** The category of the element */
    category?: string;
  };
};
