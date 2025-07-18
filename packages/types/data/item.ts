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
    category?: string;
    type?: 'Bag' | 'Default' | 'Instruction' | 'StickerSheet' | 'DUPLO' | 'LEGO' | 'TECHNIC';
  }
  flags?: string[];
  icon?: string;
  id: number;
  name: string;
  type: 'Container' | 'Documentation' | 'Element' | 'Packaging' | 'Product';
};
