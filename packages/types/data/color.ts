export type Color = {
  /** The color ID */
  id: number;

  /** The name of the color */
  name: string;

  /** The base RGB color */
  base_rgb: [number, number, number];

  /** Color categories */
  categories: string[];

  /** Appearance on plastic */
  platic: ColorMaterial;

  /** Item id of the dye */
  item?: number;
}

type ColorMaterial = {
  /** Brightness of the color */
  brightness: number;

  /** Contrast of the color */
  contrast: number;

  /** HSL hue of the color */
  hue: number;

  /** HSL lightness of the color */
  lightness: number;

  /** HSL saturation of the color */
  saturation: number;

  /** Precalculated RGB color */
  rgb: [number, number, number];
}
