export type Color = {
  /** The color ID */
  id: number;

  /** The name of the color */
  name: string;

  /** The type of the color */
  type: 'Glow' | 'Metallic' | 'Multicolor' | 'Solid' | 'Transparent';

  /** The base RGB color */
  base_rgb: [number, number, number];

  /** Color categories */
  categories: string[];

  /** Appearance on plastic */
  plastic: ColorMaterial;
}

type ColorMaterial = {
  /** Brightness of the color */
  brightness: number;

  /** Contrast of the color */
  contrast: number;

  /** HSL hue of the color */
  hue: number;

  /** HSL saturation of the color */
  saturation: number;

  /** HSL lightness of the color */
  lightness: number;

  /** Precalculated RGB color */
  rgb: [number, number, number];

  /** Precalculated HEX color */
  hex: string;
}
