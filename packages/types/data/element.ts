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
 * DesignCategory as returned from `/v2/elements/designs/categories`
 */
export interface DesignCategory {
  /** The ID of the element design category */
  id: number;

  /** The name of the element design category */
  name: string;

  /** List if design IDs that are part of this element design category */
  designs: number[];
}

/** DesignGroup as returned from `/v2/elements/designs/groups */
export interface DesignGroup {
  /** The ID of the design group */
  id: number;

  /** The name of the design group */
  name: string;

  /** Design category IDs that are part of this group */
  categories: number[];
}