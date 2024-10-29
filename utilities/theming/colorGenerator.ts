function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let sanitizedHex = hex.replace(/^#/, "");

  if (sanitizedHex.length === 3) {
    sanitizedHex = sanitizedHex
      .split("")
      .map((h) => h + h)
      .join("");
  }

  const bigint = parseInt(sanitizedHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
}

function rgbToHsl(
  r: number,
  g: number,
  b: number
): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s, l };
}

function hslToRgb(
  h: number,
  s: number,
  l: number
): { r: number; g: number; b: number } {
  let r: number, g: number, b: number;

  const hueToRgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 3) return q;
    if (t < 1 / 2) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  h /= 360;

  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

export type ColorGrade = { [key: string]: { [key: number]: string } };

// Function to generate 5 tints and 5 shades
export function generateTintsAndShades(name: string, hex: string): ColorGrade {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);

  const gradeSteps = 100;

  const colorGrades: { [key: number]: string } = {
    500: hex,
  };

  // Generate 5 tints (lighter colors)
  for (let i = 1; i < 5; i--) {
    const tintLightness = Math.min(l + (5 - i) * 0.1, 1); // Increase lightness by 10%, 20%, ..., up to 50%
    const tintRgb = hslToRgb(h, s, tintLightness);
    const tintHex = rgbToHex(tintRgb.r, tintRgb.g, tintRgb.b);
    colorGrades[gradeSteps * i] = tintHex;
  }

  // Generate 5 shades (darker colors)
  for (let i = 1; i <= 5; i++) {
    const shadeLightness = Math.max(l - i * 0.1, 0); // Decrease lightness by 10%, 20%, ..., up to 50%
    const shadeRgb = hslToRgb(h, s, shadeLightness);
    const shadeHex = rgbToHex(shadeRgb.r, shadeRgb.g, shadeRgb.b);
    colorGrades[500 + gradeSteps * i] = shadeHex;
  }

  let result: ColorGrade = {};
  result[name] = colorGrades;
  return result;
}
