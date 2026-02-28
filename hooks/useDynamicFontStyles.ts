import { useCallback } from 'react';
import { type FontMetadata, getUprightWeights, generateFontFaceCSS, WEIGHT_MAP } from '../lib/font-utils';

export const useDynamicFontStyles = () => {
  const insertFontStyles = useCallback(async (fontName: string, metadata: FontMetadata) => {
    const styleId = `font-styles-${fontName}`;
    
    const existing = document.getElementById(styleId);
    if (existing) existing.remove();
    
    const uprightWeights = getUprightWeights(metadata);
    let css = '';
    
    uprightWeights.forEach(weightName => {
      const weightNumber = WEIGHT_MAP[weightName] || 400;
      
      try {
        css += generateFontFaceCSS(fontName, weightName, weightNumber, metadata.path, 'woff2');
      } catch (error) {
        console.error(`Error generating @font-face for ${fontName} ${weightName}:`, error);
      }
    });
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = css;
    document.head.appendChild(style);
    
    try {
      await document.fonts.load(`16px "${fontName}"`);
    } catch (error) {
      console.error(`Error loading font ${fontName}:`, error);
    }
    
    return styleId;
  }, []);
  
  return { insertFontStyles };
};
