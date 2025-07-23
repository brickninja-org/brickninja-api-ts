/**
 * ElementGroup as returned from `/v1/elements/groups`
 * @see TODO link to documentation
 */
export interface ElementGroup {
  /** The id of the element group */
  id: number;

  /** The name of the element group */
  name: string;

  /** The description of the element group */
  description?: string;

  /** Element category ids that are part of this group */
  categories: number[]
}
