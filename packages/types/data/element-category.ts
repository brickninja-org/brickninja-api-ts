/**
 * ElementCategory as returned from `/v1/elements/categories`
 * @see TODO link to documentation
 */
export interface ElementCategory {
  /** The id of the element category */
  id: string;

  /** The name of the element category */
  name: string;

  /** The description of the element category */
  description?: string;

  /** The icon of the element category */
  icon?: string;
}
