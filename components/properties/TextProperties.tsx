'use client';

import React, { useCallback } from 'react';
import { ChevronDown, RotateCcw, RotateCw, Box } from 'lucide-react';
import { useEditor, useSelectedElement } from '../../lib/editor-context';
import { type TextElement, type TextContent } from '../../lib/editor-types';
import { Input } from '../ui/input';
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';

interface TextPropertiesProps {
  fonts: string[];
  availableWeights: number[];
}

export function TextProperties({ fonts, availableWeights }: TextPropertiesProps) {
  const selectedElement = useSelectedElement() as TextElement | null;
  const { updateElement } = useEditor();
  
  const textContent = selectedElement?.content as TextContent | null;

  const handleUpdateTextContent = useCallback((updates: Partial<TextContent>) => {
    if (!selectedElement || selectedElement.type !== 'text') return;
    updateElement(selectedElement.id, {
      content: { ...textContent!, ...updates }
    });
  }, [selectedElement, textContent, updateElement]);

  if (!selectedElement || selectedElement.type !== 'text' || !textContent) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label htmlFor="font-family" className="text-xs font-semibold text-slate-400">Font Family</label>
        <span className="text-[10px] text-primary cursor-pointer hover:underline">Browse Fonts</span>
      </div>
      <div className="relative">
        <select 
          id="font-family"
          className="w-full bg-surface-lighter border border-slate-700 text-white text-sm rounded-lg p-2.5 focus:ring-primary focus:border-primary appearance-none cursor-pointer outline-none"
          value={textContent.fontFamily}
          onChange={(e) => handleUpdateTextContent({ fontFamily: e.target.value })}
        >
          {fonts.length === 0 && <option value="">Loading fonts...</option>}
          {fonts.map(font => (
            <option key={font} value={font}>{font}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-2.5 text-slate-400 pointer-events-none size-4" />
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="font-weight">Weight</Label>
          <div className="relative">
            <select 
              id="font-weight"
              className="w-full bg-surface-lighter border border-slate-700 text-white text-sm rounded-lg p-2 focus:ring-primary focus:border-primary appearance-none outline-none"
              value={textContent.fontWeight}
              onChange={(e) => handleUpdateTextContent({ fontWeight: Number(e.target.value) })}
            >
              {availableWeights.map((w: number) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-2.5 text-slate-400 pointer-events-none size-4" />
          </div>
        </div>
        <div>
          <Label htmlFor="font-size">Size</Label>
          <div className="flex items-center bg-surface-lighter border border-slate-700 rounded-lg overflow-hidden">
            <Input 
              id="font-size"
              className="w-full bg-transparent border-0 text-white text-sm p-2 focus:ring-0 text-center" 
              type="number" 
              value={textContent.fontSize}
              onChange={(e) => handleUpdateTextContent({ fontSize: Number(e.target.value) })}
            />
            <span className="text-xs text-slate-500 pr-2">px</span>
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="text-content">Text</Label>
        <textarea
          id="text-content"
          className="w-full bg-surface-lighter border border-slate-700 text-white text-sm rounded-lg p-2.5 focus:ring-primary focus:border-primary outline-none resize-none"
          rows={3}
          value={textContent.text}
          onChange={(e) => handleUpdateTextContent({ text: e.target.value })}
        />
      </div>

      <div>
        <Label>Style</Label>
        <div className="flex gap-2">
          <button 
            type="button"
            className={`flex-1 p-2 rounded-lg border transition-all text-sm font-medium ${
              !textContent.isItalic 
                ? 'bg-primary text-background-dark border-primary' 
                : 'bg-surface-lighter border-slate-700 text-slate-400 hover:text-white'
            }`}
            onClick={() => handleUpdateTextContent({ isItalic: false })}
          >
            Regular
          </button>
          <button 
            type="button"
            className={`flex-1 p-2 rounded-lg border transition-all text-sm font-medium ${
              textContent.isItalic 
                ? 'bg-primary text-background-dark border-primary' 
                : 'bg-surface-lighter border-slate-700 text-slate-400 hover:text-white'
            }`}
            onClick={() => handleUpdateTextContent({ isItalic: true })}
          >
            Italic
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="space-y-1.5">
          <Label htmlFor="fill-color">Fill</Label>
          <div className="flex items-center gap-2 bg-surface-lighter border border-slate-700 rounded p-1.5 cursor-pointer hover:border-slate-500">
            <input 
              id="fill-color"
              type="color"
              value={textContent.fill}
              onChange={(e) => handleUpdateTextContent({ fill: e.target.value })}
              className="w-6 h-6 rounded border-0 p-0 cursor-pointer"
            />
            <span className="text-xs text-slate-300 font-mono">{textContent.fill.toUpperCase()}</span>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="stroke-color">Stroke</Label>
          <div className="flex items-center gap-2 bg-surface-lighter border border-slate-700 rounded p-1.5 cursor-pointer hover:border-slate-500">
            <input 
              id="stroke-color"
              type="color"
              value={textContent.stroke}
              onChange={(e) => handleUpdateTextContent({ stroke: e.target.value })}
              className="w-6 h-6 rounded border-0 p-0 cursor-pointer"
            />
            <span className="text-xs text-slate-300 font-mono">{textContent.stroke.toUpperCase()}</span>
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="stroke-width">Stroke Width</Label>
        <div className="flex items-center gap-2">
          <Slider 
            id="stroke-width"
            min={0}
            max={10}
            value={textContent.strokeWidth}
            onChangeValue={(v) => handleUpdateTextContent({ strokeWidth: v })}
            showValue
            valueLabel="px"
          />
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-surface-lighter">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Box className="text-secondary size-4" />
            Position &amp; Size
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="pos-x">X Position</Label>
            <Input 
              id="pos-x"
              type="number"
              value={Math.round(selectedElement.position.x)}
              onChange={(e) => updateElement(selectedElement.id, { 
                position: { ...selectedElement.position, x: Number(e.target.value) }
              })}
            />
          </div>
          <div>
            <Label htmlFor="pos-y">Y Position</Label>
            <Input 
              id="pos-y"
              type="number"
              value={Math.round(selectedElement.position.y)}
              onChange={(e) => updateElement(selectedElement.id, { 
                position: { ...selectedElement.position, y: Number(e.target.value) }
              })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="elem-width">Width</Label>
            <Input 
              id="elem-width"
              type="number"
              value={Math.round(selectedElement.width)}
              onChange={(e) => updateElement(selectedElement.id, { width: Number(e.target.value) })}
            />
          </div>
          <div>
            <Label htmlFor="elem-height">Height</Label>
            <Input 
              id="elem-height"
              type="number"
              value={Math.round(selectedElement.height)}
              onChange={(e) => updateElement(selectedElement.id, { height: Number(e.target.value) })}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="rotation">Rotation</Label>
          <div className="flex items-center gap-2">
            <RotateCcw className="text-slate-500 size-3" />
            <Slider 
              id="rotation"
              min={-180}
              max={180}
              value={selectedElement.rotation}
              onChangeValue={(v) => updateElement(selectedElement.id, { rotation: v })}
              showValue
              valueLabel="°"
            />
            <RotateCw className="text-slate-500 size-3" />
          </div>
        </div>

        <div>
          <Label htmlFor="opacity">Opacity</Label>
          <Slider 
            id="opacity"
            min={0}
            max={1}
            step={0.01}
            value={selectedElement.opacity}
            onChangeValue={(v) => updateElement(selectedElement.id, { opacity: v })}
            showValue
          />
        </div>
      </div>
    </div>
  );
}
