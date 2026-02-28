'use client';

import React from 'react';
import { Shapes } from 'lucide-react';
import { useEditor, useSelectedElement } from '../../lib/editor-context';
import { type ShapeElement } from '../../lib/editor-types';
import { Input } from '../ui/input';
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';

export function ShapeProperties() {
  const selectedElement = useSelectedElement() as ShapeElement | null;
  const { updateElement } = useEditor();
  
  if (!selectedElement || selectedElement.type !== 'shape') {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Shapes className="text-primary size-4" />
          Shape Properties
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="pos-x-shape">X Position</Label>
          <Input 
            id="pos-x-shape"
            type="number"
            value={Math.round(selectedElement.position.x)}
            onChange={(e) => updateElement(selectedElement.id, { 
              position: { ...selectedElement.position, x: Number(e.target.value) }
            })}
          />
        </div>
        <div>
          <Label htmlFor="pos-y-shape">Y Position</Label>
          <Input 
            id="pos-y-shape"
            type="number"
            value={Math.round(selectedElement.position.y)}
            onChange={(e) => updateElement(selectedElement.id, { 
              position: { ...selectedElement.position, y: Number(e.target.value) }
            })}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="rotation-shape">Rotation</Label>
        <Slider 
          id="rotation-shape"
          min={-180}
          max={180}
          value={selectedElement.rotation}
          onChangeValue={(v) => updateElement(selectedElement.id, { rotation: v })}
          showValue
          valueLabel="°"
        />
      </div>

      <div>
        <Label htmlFor="opacity-shape">Opacity</Label>
        <Slider 
          id="opacity-shape"
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
