'use client';

import React, { useCallback } from 'react';
import { useEditor } from '../lib/editor-context';
import { CanvasElement } from './CanvasElement';
import { type FontMetadata } from '../lib/font-utils';

interface CanvasAreaProps {
  selectedFont: FontMetadata | null;
  selectedWeight: number;
  isItalic: boolean;
}

export function CanvasArea({ selectedFont, selectedWeight, isItalic }: CanvasAreaProps) {
  const { elements, selectedElementId, selectElement, canvasWidth, canvasHeight, zoom, backgroundImage, backgroundBlur, backgroundBrightness } = useEditor();
  const fontFamily = selectedFont ? `"${selectedFont.name}"` : 'var(--font-space-grotesk)';
  
  const handleElementMouseDown = useCallback((e: React.MouseEvent, elementId: string) => {
    e.stopPropagation();
    selectElement(elementId);
  }, [selectElement]);

  const handleCanvasMouseDown = useCallback(() => {
    selectElement(null);
  }, [selectElement]);

  return (
    <main className="flex-1 bg-background-dark flex flex-col relative overflow-hidden">
      <div 
        onMouseDown={handleCanvasMouseDown}
        className="flex-1 flex items-center justify-center p-12 overflow-auto bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px]"
      >
        <div 
          className="relative shadow-2xl group border border-surface-lighter ring-1 ring-black/50"
          style={{ 
            width: `${canvasWidth * zoom / 100}px`,
            aspectRatio: `${canvasWidth} / ${canvasHeight}`
          }}
        >
          {backgroundImage && (
            <div 
              className="absolute inset-0 bg-cover bg-center overflow-hidden"
              style={{ 
                backgroundImage: `url('${backgroundImage}')`,
                filter: `blur(${backgroundBlur}px) brightness(${backgroundBrightness})`
              }}
            ></div>
          )}

          {elements
            .filter(el => el.visible)
            .sort((a, b) => a.zIndex - b.zIndex)
            .map((element) => (
              <CanvasElement
                key={element.id}
                element={element}
                isSelected={selectedElementId === element.id}
                onMouseDown={handleElementMouseDown}
                fontFamily={fontFamily}
                fontWeight={selectedWeight}
                isItalic={isItalic}
              />
            ))}
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-surface-dark/90 backdrop-blur border border-surface-lighter rounded-full px-4 py-2 text-xs text-slate-300 shadow-lg">
          Canvas: {canvasWidth} x {canvasHeight} • Zoom: {zoom}%
        </div>
      </div>
    </main>
  );
}
