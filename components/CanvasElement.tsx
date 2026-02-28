'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Type, ImageIcon as ImageIcon, Shapes } from 'lucide-react';
import Image from 'next/image';
import { useEditor } from '../lib/editor-context';
import { type EditorElement, type TextContent, type ImageContent, type ShapeContent } from '../lib/editor-types';

interface CanvasElementProps {
  element: EditorElement;
  isSelected: boolean;
  onMouseDown: (e: React.MouseEvent, id: string) => void;
  fontFamily: string;
  fontWeight: number;
  isItalic: boolean;
}

export function CanvasElement({ element, isSelected, onMouseDown, fontFamily, fontWeight, isItalic }: CanvasElementProps) {
  const { updateElement, zoom, activeTool } = useEditor();
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [elementStart, setElementStart] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeCorner, setResizeCorner] = useState<'tl' | 'tr' | 'bl' | 'br' | null>(null);
  const [resizeStart, setResizeStart] = useState({
    x: 0, y: 0,
    width: 0, height: 0,
    posX: 0, posY: 0,
    aspectRatio: 1
  });

  const scaledStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${element.position.x * zoom / 100}px`,
    top: `${element.position.y * zoom / 100}px`,
    width: `${element.width * zoom / 100}px`,
    height: `${element.height * zoom / 100}px`,
    transform: `rotate(${element.rotation}deg)`,
    opacity: element.opacity,
    zIndex: element.zIndex,
    pointerEvents: element.locked ? 'none' as 'none' : 'auto' as 'auto',
    cursor: element.locked ? 'not-allowed' : (activeTool === 'select' || activeTool === 'hand') ? 'move' : 'default',
    filter: element.smartBlurIntensity > 0 ? `blur(${element.smartBlurIntensity * zoom / 100}px)` : undefined
  };

  const depthStyle: React.CSSProperties = element.depthEnabled ? {
    transform: `rotateY(${element.zRotation}deg) rotateX(${element.zRotation * 0.5}deg)`,
    boxShadow: `
      ${element.extrusionDepth * zoom / 100}px ${element.extrusionDepth * zoom / 100}px 0 rgba(0, 0, 0, 0.3),
      ${element.shadowDistance * zoom / 100}px ${element.shadowDistance * zoom / 100}px 20px rgba(0, 0, 0, 0.4)
    `,
    perspective: '1000px'
  } : {};

  const neonGlowStyle: React.CSSProperties = element.neonGlowEnabled && element.neonGlowIntensity > 0 ? {
    boxShadow: `0 0 ${element.neonGlowIntensity * 0.5 * zoom / 100}px ${element.neonGlowIntensity * 0.25 * zoom / 100}px ${element.neonGlowType === 'hard' ? 0 : 10}px rgba(249, 115, 22, ${element.neonGlowIntensity / 100})`
  } : {};

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (element.locked || (activeTool !== 'select' && activeTool !== 'hand')) return;

    e.preventDefault();
    e.stopPropagation();

    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setElementStart({ x: element.position.x, y: element.position.y });
    onMouseDown(e, element.id);
  }, [element.id, element.locked, element.position, activeTool, onMouseDown]);

  const handleResizeMouseDown = useCallback((e: React.MouseEvent, corner: 'tl' | 'tr' | 'bl' | 'br') => {
    if (element.locked || (activeTool !== 'select' && activeTool !== 'hand')) return;

    e.preventDefault();
    e.stopPropagation();

    setIsResizing(true);
    setResizeCorner(corner);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: element.width,
      height: element.height,
      posX: element.position.x,
      posY: element.position.y,
      aspectRatio: element.width / element.height
    });
    onMouseDown(e, element.id);
  }, [element.id, element.locked, element.width, element.height, element.position, activeTool, onMouseDown]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = (e.clientX - dragStart.x) * 100 / zoom;
      const deltaY = (e.clientY - dragStart.y) * 100 / zoom;

      updateElement(element.id, {
        position: {
          x: Math.max(0, elementStart.x + deltaX),
          y: Math.max(0, elementStart.y + deltaY)
        }
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, elementStart, element.id, zoom, updateElement]);

  useEffect(() => {
    if (!isResizing || !resizeCorner) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = (e.clientX - resizeStart.x) * 100 / zoom;
      const deltaY = (e.clientY - resizeStart.y) * 100 / zoom;

      let newWidth = resizeStart.width;
      let newHeight = resizeStart.height;
      let newX = resizeStart.posX;
      let newY = resizeStart.posY;

      const MIN_SIZE = 20;

      switch (resizeCorner) {
        case 'br':
          newWidth = resizeStart.width + deltaX;
          newHeight = newWidth / resizeStart.aspectRatio;
          newWidth = newHeight * resizeStart.aspectRatio;
          break;
        case 'bl':
          newWidth = resizeStart.width - deltaX;
          newHeight = newWidth / resizeStart.aspectRatio;
          newWidth = newHeight * resizeStart.aspectRatio;
          newX = resizeStart.posX + (resizeStart.width - newWidth);
          break;
        case 'tr':
          newWidth = resizeStart.width + deltaX;
          newHeight = newWidth / resizeStart.aspectRatio;
          newWidth = newHeight * resizeStart.aspectRatio;
          newY = resizeStart.posY + (resizeStart.height - newHeight);
          break;
        case 'tl':
          newWidth = resizeStart.width - deltaX;
          newHeight = newWidth / resizeStart.aspectRatio;
          newWidth = newHeight * resizeStart.aspectRatio;
          newX = resizeStart.posX + (resizeStart.width - newWidth);
          newY = resizeStart.posY + (resizeStart.height - newHeight);
          break;
      }

      if (newWidth >= MIN_SIZE && newHeight >= MIN_SIZE) {
        updateElement(element.id, {
          width: newWidth,
          height: newHeight,
          position: {
            x: Math.max(0, newX),
            y: Math.max(0, newY)
          }
        });
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeCorner(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, resizeCorner, resizeStart, element.id, zoom, updateElement]);

  const selectionBox = isSelected && !element.locked ? (
    <div className="absolute inset-0 border-2 border-primary pointer-events-none" data-export-exclude="true">
      <div
        className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-primary rounded-full pointer-events-auto cursor-nwse-resize"
        onMouseDown={(e) => handleResizeMouseDown(e, 'tl')}
      ></div>
      <div
        className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-primary rounded-full pointer-events-auto cursor-nesw-resize"
        onMouseDown={(e) => handleResizeMouseDown(e, 'tr')}
      ></div>
      <div
        className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-primary rounded-full pointer-events-auto cursor-nesw-resize"
        onMouseDown={(e) => handleResizeMouseDown(e, 'bl')}
      ></div>
      <div
        className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-primary rounded-full pointer-events-auto cursor-nwse-resize"
        onMouseDown={(e) => handleResizeMouseDown(e, 'br')}
      ></div>
    </div>
  ) : null;

  if (element.type === 'text') {
    const textContent = element.content as TextContent;
    return (
      <div
        onMouseDown={handleMouseDown}
        style={{
          ...scaledStyle,
          ...depthStyle,
          ...neonGlowStyle
        }}
        className="select-none"
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            fontFamily: `"${textContent.fontFamily}"`,
            fontSize: `${textContent.fontSize * zoom / 100}px`,
            fontWeight: textContent.fontWeight,
            fontStyle: textContent.isItalic ? 'italic' : 'normal',
            color: textContent.fill,
            WebkitTextStroke: `${textContent.strokeWidth}px ${textContent.stroke}`,
            lineHeight: textContent.lineHeight,
            letterSpacing: `${textContent.letterSpacing}px`,
            ...(textContent.shadowEnabled && {
              textShadow: `4px 4px 0px ${textContent.stroke}`
            }),
            ...(element.neonGlowEnabled && element.neonGlowIntensity > 0 && {
              textShadow: `0 0 ${element.neonGlowIntensity * 0.5 * zoom / 100}px ${element.neonGlowIntensity * 0.25 * zoom / 100}px ${element.neonGlowType === 'hard' ? 0 : 10}px rgba(249, 115, 22, ${element.neonGlowIntensity / 100})`
            }),
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            padding: '8px'
          }}
        >
          {textContent.text}
        </div>
        {selectionBox}
      </div>
    );
  }

  if (element.type === 'image') {
    const imageContent = element.content as ImageContent;
    return (
      <div
        onMouseDown={handleMouseDown}
        style={{
          ...scaledStyle,
          ...depthStyle,
          ...neonGlowStyle
        }}
        className="overflow-hidden"
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            transform: `scaleX(${imageContent.flipX ? -1 : 1}) scaleY(${imageContent.flipY ? -1 : 1})`,
            WebkitMaskImage: imageContent.maskGradient,
            maskImage: imageContent.maskGradient,
            position: 'relative',
          }}
        >
          <Image
            src={imageContent.src}
            alt={element.name}
            fill
            className="w-full h-full object-cover"
            style={{
              objectFit: imageContent.objectFit,
            }}
            sizes="(max-width: 768px) 100vw, 1280px"
          />
        </div>
        {selectionBox}
      </div>
    );
  }

  if (element.type === 'shape') {
    const shapeContent = element.content as ShapeContent;
    return (
      <div
        onMouseDown={handleMouseDown}
        style={{
          ...scaledStyle,
          ...depthStyle,
          ...neonGlowStyle
        }}
      >
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            backgroundColor: shapeContent.fill,
            border: `${shapeContent.strokeWidth}px solid ${shapeContent.stroke}`,
            borderRadius: shapeContent.shapeType === 'circle' ? '50%' : shapeContent.shapeType === 'badge' ? '9999px' : '0',
            transform: `rotate(${shapeContent.rotation}deg)`
          }}
        >
          {shapeContent.text && (
            <span
              className="text-white font-bold"
              style={{
                fontSize: `${(shapeContent.text?.length || 1) > 8 ? '12px' : '16px'}`
              }}
            >
              {shapeContent.text}
            </span>
          )}
        </div>
        {selectionBox}
      </div>
    );
  }

  return null;
}
