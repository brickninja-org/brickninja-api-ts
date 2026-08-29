import type { SchemaAfter, SchemaVersion } from "../schema";

/**
 * Element as returned from `/v2/elements` endpoint.
 */
export type Element<Schema extends SchemaVersion = undefined> =
  Schema extends undefined ? Element<Exclude<SchemaVersion, undefined>> :
  Schema extends SchemaAfter<'2026-08-29T00:00:00Z'> | 'latest' ? ElementV2_2026_08_29 :
  ElementBase;

interface ElementBase {
  /** The id of the element */
  id: number;

  /** The name of the element */
  name: string;

  /** The image URL of the element */
  icon: string;
}

type ElementV2_2026_08_29 = ElementBase;

/**
 * Color as returned from `/v2/elements/colors?ids=...` endpoint
 */
export type Color<Schema extends SchemaVersion = undefined> =
  Schema extends undefined ? BaseColor :
  BaseColor;

  export interface BaseColor {
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
  element_ids: number[],
}

/**
 * ElementSubcategory as returned from `/v2/elements/subcategories`
 */
export interface ElementSubcategory {
  /** The ID of the element subcategory */
  id: number;

  /** The name of the element subcategory */
  name: string;

  /** List of design IDs that are part of this element subcategory */
  design_ids: number[];
}

/**
 * ElementCategory as returned from `/v2/elements/categories
 */
export interface ElementCategory {
  /** The ID of the element category */
  id: number;

  /** The name of the element category */
  name: string;

  /** List of subcategory IDs that are part of this group */
  subcategory_ids: number[];
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
  piece_type: string;

  /** The weight in grams of the design  */
  weight: number;

  /** List of element IDs that are part of this design */
  element_ids: number[];
}
