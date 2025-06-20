import type { SchemaVersion } from "../schema";

export type Item<Schema extends SchemaVersion = undefined> =
  Schema extends undefined ? ItemBase :
  ItemBase;

type ItemBase = {
  details?: {
    color_id?: number;
  }
  flags: string[];
  id: number;
  name: string;
  type: 'Container' | 'Element'
};
