import type { SchemaVersion } from "../schema";

export type Item<Schema extends SchemaVersion = undefined> =
  Schema extends undefined ? ItemBase :
  ItemBase;

type ItemBase = {
  barcode?: string;
  default_product?: number;
  details?: {
    color_id?: number;
    design_id?: number;
    instruction_item_ids?: number[];
    piece_type?: 'DUPLO' | 'LEGO' | 'TECHNIC'
    type?: 'Default' | 'Instruction' | 'Plate'
  }
  flags: string[];
  icon?: string;
  id: number;
  name: string;
  type: 'Container' | 'Element' | 'Product'
};
