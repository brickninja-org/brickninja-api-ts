/**
 * ElementDesign as returned from `/v1/elements/designs`
 * @see TODO link to documentation
 */
export interface ElementDesign {
  /** The id of the element */
  id: number;

  /** The name of the element */
  name: string;

  /** The category id of the element */
  category_id: number;

  /** The type of the element */
  type: 'DUPLO' | 'LEGO' | 'TECHNIC';

  /** The weight of the element */
  weight?: number;
}
