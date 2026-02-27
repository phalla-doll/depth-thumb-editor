import fontsMetadata from './fonts-metadata.json';

export interface FontMetadata {
  name: string;
  path: string;
  web: {
    count: number;
    formats: string[];
  };
  otf: {
    count: number;
    files: string[];
  };
  ttf: {
    count: number;
    files: string[];
  };
  weights: string[];
}

export const WEIGHT_MAP: Record<string, number> = {
  'Thin': 100,
  'Extralight': 200,
  'Light': 300,
  'Regular': 400,
  'Medium': 500,
  'Semibold': 600,
  'Bold': 700,
  'Extrabold': 800,
  'Black': 900,
  'Variable': 400
};

export const getUprightWeights = (metadata: FontMetadata): string[] => {
  return metadata.weights.filter(w => !w.includes('Italic'));
};

export const getWeightNumbers = (metadata: FontMetadata): number[] => {
  return getUprightWeights(metadata)
    .map(w => WEIGHT_MAP[w] || 400)
    .filter((w, i, arr) => arr.indexOf(w) === i)
    .sort((a, b) => a - b);
};

export const generateFontFaceCSS = (
  fontName: string,
  weightName: string,
  weightNumber: number,
  path: string,
  format: 'woff2' | 'woff' = 'woff2'
): string => {
  const filename = `${fontName}-${weightName}.${format}`;
  const fontUrl = `${path}/WEB/${filename}`;
  
  return `
@font-face {
  font-family: '${fontName}';
  font-style: normal;
  font-weight: ${weightNumber};
  src: url('${fontUrl}') format('${format}');
  font-display: swap;
}
`;
};

export const getDefaultFont = (): FontMetadata => {
  const fontsList = Object.values(fontsMetadata as Record<string, FontMetadata>);
  return fontsList.find((f: FontMetadata) => f.name === 'Boska') || fontsList[0];
};

export const getFontsList = (): FontMetadata[] => {
  return Object.values(fontsMetadata as Record<string, FontMetadata>);
};
