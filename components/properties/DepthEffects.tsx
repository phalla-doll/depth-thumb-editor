'use client';

import React from 'react';
import { Box, Droplets } from 'lucide-react';
import { Slider } from '../ui/slider';
import { useEditor, useSelectedElement } from '../../lib/editor-context';

export function DepthEffects() {
  const selectedElement = useSelectedElement();
  const { updateElement } = useEditor();

  const depthEnabled = selectedElement?.depthEnabled ?? false;
  const extrusionDepth = selectedElement?.extrusionDepth ?? 24;
  const shadowDistance = selectedElement?.shadowDistance ?? 12;
  const zRotation = selectedElement?.zRotation ?? -5;
  const neonGlowEnabled = selectedElement?.neonGlowEnabled ?? true;
  const neonGlowIntensity = selectedElement?.neonGlowIntensity ?? 75;
  const neonGlowType = selectedElement?.neonGlowType ?? 'soft';
  const smartBlurIntensity = selectedElement?.smartBlurIntensity ?? 4;

  const handleUpdateElement = (updates: Partial<typeof selectedElement & Record<string, unknown>>) => {
    if (!selectedElement) return;
    updateElement(selectedElement.id, updates);
  };

  if (!selectedElement) {
    return (
      <div className="p-4 text-center text-xs text-slate-500">
        Select an element to edit effects
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 pt-4 border-t border-surface-lighter">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Box className="text-primary size-4" />
            3D &amp; Depth
          </h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              checked={depthEnabled}
              onChange={(e) => handleUpdateElement({ depthEnabled: e.target.checked })}
              className="sr-only peer"
              type="checkbox"
            />
            <div className="w-7 h-4 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-2">
            <span className="text-slate-400">Extrusion Depth</span>
            <span className="text-white font-mono">{extrusionDepth}px</span>
          </div>
          <Slider
            max={100}
            min={0}
            value={extrusionDepth}
            onChangeValue={(v) => handleUpdateElement({ extrusionDepth: v })}
          />
        </div>

        <div>
          <div className="flex justify-between text-xs mb-2">
            <span className="text-slate-400">Shadow Distance</span>
            <span className="text-white font-mono">{shadowDistance}px</span>
          </div>
          <Slider
            max={50}
            min={0}
            value={shadowDistance}
            onChangeValue={(v) => handleUpdateElement({ shadowDistance: v })}
          />
        </div>

        <div>
          <div className="flex justify-between text-xs mb-2">
            <span className="text-slate-400">Z-Rotation</span>
            <span className="text-white font-mono">{zRotation}°</span>
          </div>
          <Slider
            max={45}
            min={-45}
            value={zRotation}
            onChangeValue={(v) => handleUpdateElement({ zRotation: v })}
          />
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-surface-lighter">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Effects</h3>

        <div className="bg-surface-lighter/30 p-3 rounded-lg border border-surface-lighter">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#f97316]"></span>
              Neon Glow
            </span>
            <span className="text-[10px] text-slate-500">{neonGlowIntensity > 75 ? 'High' : neonGlowIntensity > 40 ? 'Medium' : 'Low'}</span>
          </div>
          <Slider
            max={100}
            min={0}
            value={neonGlowIntensity}
            onChangeValue={(v) => handleUpdateElement({ neonGlowIntensity: v })}
          />
          <div className="flex gap-2 mt-3">
            <button
              type="button"
              className={`flex-1 h-6 rounded border text-[10px] transition-colors ${
                neonGlowType === 'soft'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-surface-lighter border-transparent text-slate-400 hover:text-white'
              }`}
              onClick={() => handleUpdateElement({ neonGlowType: 'soft' })}
            >
              Soft
            </button>
            <button
              type="button"
              className={`flex-1 h-6 rounded border text-[10px] transition-colors ${
                neonGlowType === 'hard'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-surface-lighter border-transparent text-slate-400 hover:text-white'
              }`}
              onClick={() => handleUpdateElement({ neonGlowType: 'hard' })}
            >
              Hard
            </button>
          </div>
        </div>

        <div className="bg-surface-lighter/30 p-3 rounded-lg border border-surface-lighter">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
              <Droplets className="text-slate-400 size-3.5" />
              Smart Blur
            </span>
          </div>
          <div className="flex justify-between text-xs mb-2">
            <span className="text-slate-400">Intensity</span>
            <span className="text-white font-mono">{smartBlurIntensity}px</span>
          </div>
          <Slider
            max={20}
            min={0}
            value={smartBlurIntensity}
            onChangeValue={(v) => handleUpdateElement({ smartBlurIntensity: v })}
          />
        </div>
      </div>
    </>
  );
}