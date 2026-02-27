'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Type, ImageIcon as Image, Shapes } from 'lucide-react';
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

  const scaledStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${element.position.x * zoom / 100}px`,
    top: `${element.position.y * zoom / 100}px`,
    width: `${element.width * zoom / 100}px`,
    height: `${element.height * zoom / 100}px`,
    transform: `rotate(${element.rotation}deg)`,
    opacity: element.opacity,
    zIndex: element.zIndex,
    pointerEvents: element.locked || activeTool !== 'select' ? 'none' as 'none' : 'auto' as 'auto',
    cursor: element.locked ? 'not-allowed' : activeTool === 'select' ? 'move' : 'default'
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (element.locked || activeTool !== 'select') return;
    
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setElementStart({ x: element.position.x, y: element.position.y });
    onMouseDown(e, element.id);
  }, [element.id, element.locked, element.position, activeTool, onMouseDown]);

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

  const selectionBox = isSelected && !element.locked ? (
    <div className="absolute inset-0 border-2 border-primary pointer-events-none">
      <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-primary rounded-full"></div>
      <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-primary rounded-full"></div>
      <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-primary rounded-full"></div>
      <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-primary rounded-full"></div>
    </div>
  ) : null;

  if (element.type === 'text') {
    const textContent = element.content as TextContent;
    return (
      <div
        onMouseDown={handleMouseDown}
        style={scaledStyle}
        className="select-none"
      >
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            fontFamily: textContent.fontFamily,
            fontSize: `${textContent.fontSize * zoom / 100}px`,
            fontWeight: textContent.fontWeight,
            fontStyle: textContent.isItalic ? 'italic' : 'normal',
            color: textContent.fill,
            WebkitTextStroke: `${textContent.strokeWidth}px ${textContent.stroke}`,
            lineHeight: textContent.lineHeight,
            letterSpacing: `${textContent.letterSpacing}px`,
            textShadow: `4px 4px 0px ${textContent.stroke}`,
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
        style={scaledStyle}
        className="overflow-hidden"
      >
        <img
          src={imageContent.src}
          alt={element.name}
          className="w-full h-full object-cover"
          style={{
            objectFit: imageContent.objectFit,
            transform: `scaleX(${imageContent.flipX ? -1 : 1}) scaleY(${imageContent.flipY ? -1 : 1})`,
            WebkitMaskImage: imageContent.maskGradient,
            maskImage: imageContent.maskGradient
          }}
          draggable={false}
        />
        {selectionBox}
      </div>
    );
  }

  if (element.type === 'shape') {
    const shapeContent = element.content as ShapeContent;
    return (
      <div
        onMouseDown={handleMouseDown}
        style={scaledStyle}
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
