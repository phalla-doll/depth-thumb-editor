'use client';

import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { useSelectedElement } from '../lib/editor-context';
import { type EditorElement, type TextElement } from '../lib/editor-types';
import { TextProperties } from './properties/TextProperties';
import { ImageProperties } from './properties/ImageProperties';
import { ShapeProperties } from './properties/ShapeProperties';
import { DepthEffects } from './properties/DepthEffects';
import { getWeightNumbers, type FontMetadata } from '../lib/font-utils';

interface RightSidebarProps {
  fonts: FontMetadata[],
  selectedFont: FontMetadata | null,
  setSelectedFont: (f: FontMetadata) => void,
  selectedWeight: number,
  setSelectedWeight: (w: number) => void,
  isItalic: boolean,
  setIsItalic: (v: boolean) => void
}

export function RightSidebar({ 
  fonts, 
  selectedFont, 
  setSelectedWeight,
}: RightSidebarProps) {
  const selectedElement = useSelectedElement() as EditorElement | null;
  
  const availableWeights = selectedFont 
    ? getWeightNumbers(selectedFont)
    : [400, 700, 900];

  const isTextSelected = selectedElement?.type === 'text';

  return (
    <aside className="w-80 bg-surface-dark border-l border-surface-lighter flex flex-col shrink-0 z-40 overflow-y-auto">
      <div className="p-4 border-b border-surface-lighter bg-surface-lighter/10">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Text Properties</h2>
          <button type="button" className="text-slate-400 hover:text-white"><MoreHorizontal className="size-4" /></button>
        </div>
      </div>
      
      {!selectedElement ? (
        <div className="flex-1 flex text-center items-center justify-center text-slate-500 text-sm p-8">
          Select an element to edit its properties
        </div>
      ) : (
        <div className="p-5 space-y-8">
          <TextProperties 
            fonts={fonts.map(f => f.name)} 
            availableWeights={availableWeights}
          />
          <ImageProperties />
          <ShapeProperties />
          <DepthEffects />
        </div>
      )}
    </aside>
  );
}
