'use client';

import React, { useCallback, useState, useRef } from 'react';
import { useEditor } from '../lib/editor-context';
import { CanvasElement } from './CanvasElement';
import { SafeZonesOverlay } from './SafeZonesOverlay';
import { type FontMetadata } from '../lib/font-utils';
import { cn } from '../lib/utils';
import { type ImageElement } from '../lib/editor-types';

interface CanvasAreaProps {
  selectedFont: FontMetadata | null;
  selectedWeight: number;
  isItalic: boolean;
}

export function CanvasArea({ selectedFont, selectedWeight, isItalic }: CanvasAreaProps) {
  const { elements, selectedElementId, selectElement, canvasWidth, canvasHeight, zoom, activeTool, setZoom, setTool, backgroundImage, backgroundBlur, backgroundBrightness, backgroundColor, showSafeZones, isPreviewMode, addElement } = useEditor();
  const fontFamily = selectedFont ? `"${selectedFont.name}"` : 'var(--font-space-grotesk)';
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [scrollStart, setScrollStart] = useState({ left: 0, top: 0 });
  const [isDragOver, setIsDragOver] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const handleElementMouseDown = useCallback((e: React.MouseEvent, elementId: string) => {
    if (activeTool !== 'select') return;
    e.stopPropagation();
    selectElement(elementId);
  }, [activeTool, selectElement]);

  const handleCanvasMouseDown = useCallback((e: React.MouseEvent) => {
    if (activeTool === 'hand') {
      const container = scrollContainerRef.current;
      if (container) {
        setIsPanning(true);
        setPanStart({ x: e.clientX, y: e.clientY });
        setScrollStart({ left: container.scrollLeft, top: container.scrollTop });
      }
    } else {
      selectElement(null);
    }
  }, [activeTool, selectElement]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning) return;
    const container = scrollContainerRef.current;
    if (container) {
      const deltaX = e.clientX - panStart.x;
      const deltaY = e.clientY - panStart.y;
      container.scrollLeft = scrollStart.left - deltaX;
      container.scrollTop = scrollStart.top - deltaY;
    }
  }, [isPanning, panStart, scrollStart]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -10 : 10;
      const newZoom = Math.max(10, Math.min(200, zoom + delta));
      setZoom(newZoom);
      setTool('select');
    }
  }, [zoom, setZoom, setTool]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!isPreviewMode) {
      setIsDragOver(true);
    }
  }, [isPreviewMode]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (isPreviewMode) return;

    const files = e.dataTransfer.files;
    if (files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        const maxDimension = Math.min(canvasWidth, canvasHeight) * 0.8;
        if (width > maxDimension || height > maxDimension) {
          const ratio = width / height;
          if (width > height) {
            width = maxDimension;
            height = width / ratio;
          } else {
            height = maxDimension;
            width = height * ratio;
          }
        }

        const newElement: ImageElement = {
          id: `image-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: file.name.replace(/\.[^/.]+$/, ''),
          type: 'image',
          position: {
            x: (canvasWidth - width) / 2,
            y: (canvasHeight - height) / 2
          },
          width,
          height,
          rotation: 0,
          opacity: 100,
          zIndex: elements.length + 1,
          visible: true,
          locked: false,
          depthEnabled: false,
          extrusionDepth: 24,
          shadowDistance: 12,
          zRotation: -5,
          neonGlowEnabled: true,
          neonGlowIntensity: 75,
          neonGlowType: 'soft',
          smartBlurIntensity: 4,
          content: {
            src,
            objectFit: 'contain',
            flipX: false,
            flipY: false
          }
        };

        addElement(newElement);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  }, [isPreviewMode, canvasWidth, canvasHeight, elements.length, addElement]);

  return (
    <main className="flex-1 bg-background-dark flex flex-col relative overflow-hidden">
      <div 
        ref={scrollContainerRef}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        className={`canvas-scroll-container flex-1 flex items-center justify-center p-12 overflow-auto bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] ${activeTool === 'hand' && isPanning ? 'cursor-grabbing' : activeTool === 'hand' ? 'cursor-grab' : ''}`}
      >
        <div
          id="export-canvas"
          className={cn(
            "relative shadow-2xl group border border-surface-lighter ring-1 ring-black/50",
            isDragOver && "border-primary border-4 border-dashed"
          )}
          style={{
            width: `${canvasWidth * zoom / 100}px`,
            aspectRatio: `${canvasWidth} / ${canvasHeight}`,
            backgroundColor
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
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

          {showSafeZones && <SafeZonesOverlay canvasWidth={canvasWidth} canvasHeight={canvasHeight} />}
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-surface-dark/90 backdrop-blur border border-surface-lighter rounded-full px-4 py-2 text-xs text-slate-300 shadow-lg">
          Canvas: {canvasWidth} x {canvasHeight} • Zoom: {zoom}%
        </div>
      </div>
    </main>
  );
}
