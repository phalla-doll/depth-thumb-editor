'use client';

import React from 'react';
import { RotateCcw, RotateCw, Box, Droplets } from 'lucide-react';
import { Slider } from '../ui/slider';

export function DepthEffects() {
  return (
    <>
      <div className="space-y-4 pt-4 border-t border-surface-lighter">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Box className="text-secondary size-4" />
            3D &amp; Depth
          </h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input defaultChecked className="sr-only peer" type="checkbox" value="" />
            <div className="w-7 h-4 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-secondary"></div>
          </label>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-2">
            <span className="text-slate-400">Extrusion Depth</span>
            <span className="text-white font-mono">24px</span>
          </div>
          <Slider max={100} min={0} defaultValue={24} />
        </div>

        <div>
          <div className="flex justify-between text-xs mb-2">
            <span className="text-slate-400">Shadow Distance</span>
            <span className="text-white font-mono">12px</span>
          </div>
          <Slider max={50} min={0} defaultValue={12} />
        </div>

        <div>
          <div className="flex justify-between text-xs mb-2">
            <span className="text-slate-400">Z-Rotation</span>
            <span className="text-white font-mono">-5°</span>
          </div>
          <div className="flex items-center gap-2">
            <RotateCcw className="text-slate-500 size-3" />
            <Slider max={45} min={-45} defaultValue={-5} />
            <RotateCw className="text-slate-500 size-3" />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-surface-lighter">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Effects</h3>
        
        <div className="bg-surface-lighter/30 p-3 rounded-lg border border-surface-lighter">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#db2777]"></span>
              Neon Glow
            </label>
            <span className="text-[10px] text-slate-500">High</span>
          </div>
          <Slider max={100} min={0} defaultValue={75} />
          <div className="flex gap-2 mt-3">
            <button type="button" className="flex-1 h-6 rounded bg-secondary/20 border border-secondary text-[10px] text-secondary hover:bg-secondary hover:text-white transition-colors">Soft</button>
            <button type="button" className="flex-1 h-6 rounded bg-surface-lighter border border-transparent text-[10px] text-slate-400 hover:text-white transition-colors">Hard</button>
          </div>
        </div>

        <div className="bg-surface-lighter/30 p-3 rounded-lg border border-surface-lighter">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
              <Droplets className="text-slate-400 size-3.5" />
              Smart Blur
            </label>
          </div>
          <div className="flex justify-between text-xs mb-2">
            <span className="text-slate-400">Intensity</span>
            <span className="text-white font-mono">4px</span>
          </div>
          <Slider max={20} min={0} defaultValue={4} />
        </div>
      </div>
    </>
  );
}
