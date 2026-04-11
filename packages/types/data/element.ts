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
  type: 'Default';

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

/**
 * ElementColor as returned from `/v2/elements/colors?ids=...` endpoint
 */
export type ElementColor = {
  /** The color ID */
  id: number;

  /** The name of the color */
  name: string;

  /** The piece HEX color */
  piece_color: string;

  /** The contrast of the HEX color */
  contrast_color: string;

  /** The family of the color */
  color_family: 'Black' | 'Blue' | 'Brown' | 'Green' | 'Grey' | 'Lilac' | 'Metallic' | 'Multicombination' | 'Orange' | 'Purple' | 'Red' | 'White' | 'Yellow';

  /** List of element IDs that are part of this element color */
  element_ids: string[],
}

/**
 * ElementCategory as returned from `/v2/elements/categories`
 */
export interface ElementCategory {
  /** The ID of the element design category */
  id: number;

  /** The name of the element design category */
  name: string;

  /** List of design IDs that are part of this element design category */
  designs_ids: number[];
}

/**
 * ElementGroup as returned from `/v2/elements/groups
 */
export interface ElementGroup {
  /** The ID of the element group */
  id: number;

  /** The name of the element group */
  name: string;

  /** List of category IDs that are part of this group */
  category_ids: number[];
}

/**
 * ElementDesign as returned from `/v2/elements/designs
 */
export interface ElementDesign {
  /** The ID of the design */
  id: number;

  /** The name of the design */
  name: string;

  /** The piece type of the design */
  piece_type: 'DUPLO' | 'LEGO' | 'TECHNIC';

  /** The weight in grams of the design  */
  weight: number;

  /** List of element IDs that are part of this design */
  element_ids: string[];
}

