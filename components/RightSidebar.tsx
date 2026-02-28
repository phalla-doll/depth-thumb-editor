'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { MoreHorizontal, Palette, X } from 'lucide-react';
import { useSelectedElement, useEditor } from '../lib/editor-context';
import { type EditorElement, type TextElement, type TextContent } from '../lib/editor-types';
import { TextProperties } from './properties/TextProperties';
import { ImageProperties } from './properties/ImageProperties';
import { ShapeProperties } from './properties/ShapeProperties';
import { DepthEffects } from './properties/DepthEffects';
import { getWeightNumbers, getClosestWeight, type FontMetadata } from '../lib/font-utils';
import { useDynamicFontStyles } from '../hooks/useDynamicFontStyles';

interface RightSidebarProps {
  fonts: FontMetadata[],
  selectedFont: FontMetadata | null,
  setSelectedFont: (f: FontMetadata) => void,
  selectedWeight: number,
  setSelectedWeight: (w: number) => void,
  isItalic: boolean,
  setIsItalic: (v: boolean) => void
}

const PRESET_COLORS = [
  '#000000',
  '#1a1a1a',
  '#2d2d2d',
  '#ffffff',
  '#f3f4f6',
  '#e5e7eb',
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#3b82f6',
  '#8b5cf6',
];

export function RightSidebar({ 
  fonts, 
  selectedFont, 
  setSelectedFont,
  setSelectedWeight,
}: RightSidebarProps) {
  const selectedElement = useSelectedElement() as EditorElement | null;
  const { backgroundColor, setBackground } = useEditor();
  const [customColorInput, setCustomColorInput] = useState(false);
  const { insertFontStyles } = useDynamicFontStyles();

  const textContent = selectedElement?.type === 'text'
    ? (selectedElement.content as TextContent)
    : null;

  const elementFont = textContent
    ? fonts.find(f => f.name === textContent.fontFamily)
    : null;

  const availableWeights = elementFont
    ? getWeightNumbers(elementFont)
    : [400, 700];

  const isTextSelected = selectedElement?.type === 'text';

  useEffect(() => {
    if (elementFont && textContent) {
      const newWeights = getWeightNumbers(elementFont);
      if (!newWeights.includes(textContent.fontWeight)) {
        const closestWeight = getClosestWeight(newWeights, textContent.fontWeight);
        if (textContent.fontWeight !== closestWeight) {
          setSelectedWeight(closestWeight);
        }
      }
      insertFontStyles(elementFont.name, elementFont);
    }
  }, [elementFont, textContent, setSelectedWeight, insertFontStyles]);

  const handleColorChange = (color: string) => {
    setBackground(null, undefined, undefined, color);
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleColorChange(e.target.value);
  };

  const handleFontLoad = useCallback(async (font: FontMetadata) => {
    await insertFontStyles(font.name, font);
  }, [insertFontStyles]);

  return (
    <aside className="w-80 bg-surface-dark border-l border-surface-lighter flex flex-col shrink-0 z-40 overflow-y-auto">
      <div className="p-4 border-b border-surface-lighter bg-surface-lighter/10">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            {selectedElement ? 'Element Properties' : 'Canvas Settings'}
          </h2>
          <button type="button" className="text-slate-400 hover:text-white"><MoreHorizontal className="size-4" /></button>
        </div>
      </div>
      
      {!selectedElement ? (
        <div className="p-5 space-y-6">
          <div>
            <div className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
              <Palette className="size-4" />
              Background Color
            </div>
            
            <div className="grid grid-cols-6 gap-2 mb-3">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleColorChange(color)}
                  className="w-10 h-10 rounded-lg border-2 border-surface-lighter hover:border-white transition-colors"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
            
            <div className="relative">
              {customColorInput ? (
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={handleCustomColorChange}
                    className="size-10 rounded cursor-pointer border-2 border-surface-lighter"
                  />
                  <input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="flex-1 px-3 py-2 bg-surface-lighter border border-surface-lighter rounded-lg text-white text-sm"
                    placeholder="#000000"
                  />
                  <button
                    type="button"
                    onClick={() => setCustomColorInput(false)}
                    className="p-2 hover:bg-surface-lighter rounded-lg transition-colors"
                  >
                    <X className="size-4 text-slate-400" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setCustomColorInput(true)}
                  className="w-full px-4 py-2.5 bg-surface-lighter border border-surface-lighter rounded-lg text-white text-sm font-medium hover:bg-surface-lighter/80 hover:border-white transition-colors flex items-center justify-center gap-2"
                >
                  <Palette className="size-4" />
                  Custom Color
                </button>
              )}
            </div>
          </div>
          
          <div className="p-4 bg-surface-lighter/30 rounded-lg">
            <p className="text-xs text-slate-400 leading-relaxed">
              Select an element from the canvas to edit its properties.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-5 space-y-8">
          <TextProperties 
            fonts={fonts} 
            availableWeights={availableWeights}
            onFontLoad={handleFontLoad}
          />
          <ImageProperties />
          <ShapeProperties />
          <DepthEffects />
        </div>
      )}
    </aside>
  );
}
