'use client';

import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { useEditor, useSelectedElement } from '../../lib/editor-context';
import { type ImageElement, type ImageContent } from '../../lib/editor-types';
import { Input } from '../ui/input';
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';

export function ImageProperties() {
  const selectedElement = useSelectedElement() as ImageElement | null;
  const { updateElement } = useEditor();
  
  if (!selectedElement || selectedElement.type !== 'image') {
    return null;
  }

  const imageContent = selectedElement.content as ImageContent;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <ImageIcon className="text-primary size-4" />
          Image Properties
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="pos-x-img">X Position</Label>
          <Input 
            id="pos-x-img"
            type="number"
            value={Math.round(selectedElement.position.x)}
            onChange={(e) => updateElement(selectedElement.id, { 
              position: { ...selectedElement.position, x: Number(e.target.value) }
            })}
          />
        </div>
        <div>
          <Label htmlFor="pos-y-img">Y Position</Label>
          <Input 
            id="pos-y-img"
            type="number"
            value={Math.round(selectedElement.position.y)}
            onChange={(e) => updateElement(selectedElement.id, { 
              position: { ...selectedElement.position, y: Number(e.target.value) }
            })}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button 
          type="button"
          onClick={() => {
            const content = selectedElement.content as ImageContent;
            updateElement(selectedElement.id, {
              content: { ...content, flipX: !content.flipX }
            });
          }}
          className={`flex-1 p-2 rounded-lg border transition-all text-sm font-medium ${
            imageContent.flipX
              ? 'bg-primary text-background-dark border-primary' 
              : 'bg-surface-lighter border-slate-700 text-slate-400 hover:text-white'
          }`}
        >
          Flip Horizontal
        </button>
        <button 
          type="button"
          onClick={() => {
            const content = selectedElement.content as ImageContent;
            updateElement(selectedElement.id, {
              content: { ...content, flipY: !content.flipY }
            });
          }}
          className={`flex-1 p-2 rounded-lg border transition-all text-sm font-medium ${
            imageContent.flipY
              ? 'bg-primary text-background-dark border-primary' 
              : 'bg-surface-lighter border-slate-700 text-slate-400 hover:text-white'
          }`}
        >
          Flip Vertical
        </button>
      </div>

      <div>
        <Label htmlFor="rotation-img">Rotation</Label>
        <Slider 
          id="rotation-img"
          min={-180}
          max={180}
          value={selectedElement.rotation}
          onChangeValue={(v) => updateElement(selectedElement.id, { rotation: v })}
          showValue
          valueLabel="°"
        />
      </div>

      <div>
        <Label htmlFor="opacity-img">Opacity</Label>
        <Slider 
          id="opacity-img"
          min={0}
          max={1}
          step={0.01}
          value={selectedElement.opacity}
          onChangeValue={(v) => updateElement(selectedElement.id, { opacity: v })}
          showValue
        />
      </div>
    </div>
  );
}
