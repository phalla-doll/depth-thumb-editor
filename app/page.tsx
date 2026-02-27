'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  MousePointer2,
  Hand,
  ChevronDown,
  Grid,
  Play,
  Download,
  UploadCloud,
  Type,
  Sparkles,
  Shapes,
  User,
  Eye,
  Image as ImageIcon,
  Lock,
  MoreHorizontal,
  RotateCcw,
  RotateCw,
  Droplets
} from 'lucide-react';
import fontsMetadata from '../lib/fonts-metadata.json';

interface FontMetadata {
  name: string;
  path: string;
  web: {
    count: number;
    formats: string[];
  };
  otf: {
    count: number;
    files: string[];
  };
  ttf: {
    count: number;
    files: string[];
  };
  weights: string[];
}

const WEIGHT_MAP: Record<string, number> = {
  'Thin': 100,
  'Extralight': 200,
  'Light': 300,
  'Regular': 400,
  'Medium': 500,
  'Semibold': 600,
  'Bold': 700,
  'Extrabold': 800,
  'Black': 900,
  'Variable': 400
};

const getUprightWeights = (metadata: FontMetadata): string[] => {
  return metadata.weights.filter(w => !w.includes('Italic'));
};

const getWeightNumbers = (metadata: FontMetadata): number[] => {
  return getUprightWeights(metadata)
    .map(w => WEIGHT_MAP[w] || 400)
    .filter((w, i, arr) => arr.indexOf(w) === i)
    .sort((a, b) => a - b);
};

const generateFontFaceCSS = (
  fontName: string,
  weightName: string,
  weightNumber: number,
  path: string,
  format: 'woff2' | 'woff' = 'woff2'
): string => {
  const filename = `${fontName}-${weightName}.${format}`;
  const fontUrl = `${path}/WEB/${filename}`;
  
  return `
@font-face {
  font-family: '${fontName}';
  font-style: normal;
  font-weight: ${weightNumber};
  src: url('${fontUrl}') format('${format}');
  font-display: swap;
}
`;
};

const useDynamicFontStyles = () => {
  const insertFontStyles = useCallback((fontName: string, metadata: FontMetadata) => {
    const styleId = `font-styles-${fontName}`;
    
    const existing = document.getElementById(styleId);
    if (existing) existing.remove();
    
    const uprightWeights = getUprightWeights(metadata);
    let css = '';
    
    uprightWeights.forEach(weightName => {
      const weightNumber = WEIGHT_MAP[weightName] || 400;
      
      try {
        css += generateFontFaceCSS(fontName, weightName, weightNumber, metadata.path, 'woff2');
      } catch (error) {
        console.error(`Error generating @font-face for ${fontName} ${weightName}:`, error);
      }
    });
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = css;
    document.head.appendChild(style);
    
    return styleId;
  }, []);
  
  return { insertFontStyles };
};

function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-surface-lighter bg-surface-dark px-6 shrink-0 z-50">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center size-10 rounded-lg bg-gradient-to-br from-primary to-secondary text-background-dark">
          <Box className="size-6" />
        </div>
        <div>
          <h1 className="text-white text-lg font-bold leading-tight tracking-tight">DepthThumb</h1>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Project: Ultimate Guide v2</span>
            <span className="w-1 h-1 rounded-full bg-slate-500"></span>
            <span className="text-primary">Saved</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-background-dark rounded-lg p-1 border border-surface-lighter">
        <button className="p-2 hover:bg-surface-lighter rounded text-slate-400 hover:text-white transition-colors" title="Select">
          <MousePointer2 className="size-5" />
        </button>
        <button className="p-2 hover:bg-surface-lighter rounded text-slate-400 hover:text-white transition-colors" title="Hand Tool">
          <Hand className="size-5" />
        </button>
        <div className="w-px h-4 bg-surface-lighter"></div>
        <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-surface-lighter rounded text-sm font-medium text-slate-300 hover:text-white transition-colors">
          <span>100%</span>
          <ChevronDown className="size-4" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button className="flex items-center justify-center size-9 rounded-lg bg-surface-lighter text-slate-300 hover:bg-surface-lighter/80 hover:text-white transition-colors border border-transparent hover:border-slate-600" title="Safe Zones">
            <Grid className="size-5" />
          </button>
          <button className="flex items-center justify-center size-9 rounded-lg bg-surface-lighter text-slate-300 hover:bg-surface-lighter/80 hover:text-white transition-colors border border-transparent hover:border-slate-600" title="Preview">
            <Play className="size-5" />
          </button>
        </div>
        <button className="flex items-center justify-center gap-2 h-10 px-6 rounded-lg bg-primary hover:bg-primary/90 text-background-dark font-bold text-sm transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:shadow-[0_0_20px_rgba(249,115,22,0.5)]">
          <Download className="size-5" />
          <span>Export</span>
        </button>
        <div className="bg-center bg-no-repeat bg-cover rounded-full size-9 ring-2 ring-surface-lighter cursor-pointer ml-2" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBNMx-qk_-oYoMbXkulddTM__Q9EiEbFnmbK6xXznLxuwOYZNjSRSb82wKAO3KtGQpd09l8cAc4SpgB32etL-ERk0AVmtdXdoXPiV97TB_muNaAQn452sDyTKpoMKoyS3ec0AvojaZmN28cARy_4-ir2U3uTMFi2IW0JDxQ6ZpSpXSYu1BUIYx3rPrWtiziYp1DcuD54VkBRHGdr067Ag8MmtHOIXNwxfc1qYoa-zyHehruvtaQoH80zTENz3jvLCvEHfMnviJ6eoCj")' }}></div>
      </div>
    </header>
  );
}

function LeftSidebar() {
  return (
    <aside className="w-72 flex flex-col bg-surface-dark border-r border-surface-lighter z-40 shrink-0">
      <div className="flex border-b border-surface-lighter">
        <button className="flex-1 py-3 text-sm font-medium text-primary border-b-2 border-primary bg-surface-lighter/50">Assets</button>
        <button className="flex-1 py-3 text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-surface-lighter/30 transition-colors">Layers</button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="grid grid-cols-4 gap-2">
          <button className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg hover:bg-surface-lighter text-slate-400 hover:text-primary transition-colors group">
            <UploadCloud className="size-5 group-hover:scale-110 transition-transform" />
            <span className="text-[10px]">Upload</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg bg-surface-lighter text-primary transition-colors">
            <Type className="size-5" />
            <span className="text-[10px]">Text</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg hover:bg-surface-lighter text-slate-400 hover:text-primary transition-colors group">
            <Sparkles className="size-5 group-hover:scale-110 transition-transform" />
            <span className="text-[10px]">AI Gen</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg hover:bg-surface-lighter text-slate-400 hover:text-primary transition-colors group">
            <Shapes className="size-5 group-hover:scale-110 transition-transform" />
            <span className="text-[10px]">Shapes</span>
          </button>
        </div>

        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Templates</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'Gaming', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLeUQwW-zpvXA_hzZSL05cN5swQpMG_R0tRtYgidiB8MgI9dXr3x22aboc1uMktoJqK_80sIGYa4YBgZdHRhVEPWcyHo81DyiJ-RymbQWAFO-vNFm9X3KpBLWqWHpTRCcnu7MSPsrNdawVO2MPGt2zQlipUPymRz_0tgLOadVQ1qN9JhrurjBkogMXbVamI_kEScU2PpcUPeWXOhM2Dx1N-EnwnWmeOHBCZ8qQeEvaM8Fp4Jhkh9aRsSwnmKLByesfnU9ePZDCcuXW' },
              { name: 'Vlog', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoVYJXv4AqQh8-wzF29EH3xsfl5lvki9M2T9E1GDHVjl2acuGtKf5WR7cYcgiicFqcZavcYlhGHQpXJq-Tl_GhdbYpPql_cRbtzJ3GubftnkmN7N3JEG-zdvHgz40G1cizyELm6g47G8ENRgrJ3B1euXqV2t1wysgOpAFr_iMQ9LWyCAPoII9pxsvVTF7PdsOlfwBXIgxRbvvYQiL8qlMXler5ykGuOX6mpH6fBkke6pd054nAIbo3D5M_6jbGbDyFqK9L6br5haMl' },
              { name: 'Tech', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGFGJeE5_6PLMfk-7l2tAjhO18WRQFLMJC8iy59hPbo4IPXmpqGqrTT0yvrabzvwMpG7O2CzhWiGV7ezSl6hkZVYLJzdoNjaIvL9yQf1Nq09etAfi8iblN2tPBof97Fl_eHCftoJWvVdkpkXnd-Jr3fcNRZPUA0xL2su3T9_y0pbXyt3iqoMe-bFnPZreC9FttTTp9beF68YXwaDclkmne1lHpwzUZKKNK34oJaAz-9nUh7zahdJdUUiA0NDHc4_AlGDnvGU4iU3ns' },
              { name: 'Podcast', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1_h9qXBcffK53k07QKlefxxpees4MA_2UKJ1d1fcUqPlqPyw4Y-H9lRHKlJeEwtsLDKOaXxuNtmxZniucZrGH9EqEzEIzLROZOGBL6KhbbF4wVQvfq4eDHRthnbitl8va5Kt1cM5YXziAYmjuFT2kyvbBi7KC8lGZH0_BAoeEtUcwKZgfjbXTH35rTs1yypS3Fn1SwD14YinvvZoSozJBuEynPo7cdZUfeZeTycyoRVFQk6CrYVZgQDGRlK4k8uUd6EyCXFgLwpno' }
            ].map((template) => (
              <div key={template.name} className="aspect-video bg-slate-800 rounded border border-slate-700 hover:border-primary cursor-pointer relative group overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:opacity-100 transition-opacity" style={{ backgroundImage: `url('${template.url}')` }}></div>
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-2 text-[10px] text-white font-medium">{template.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Active Layers</h3>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3 p-2 bg-surface-lighter rounded border-l-2 border-primary cursor-pointer">
              <Type className="size-4 text-slate-400" />
              <span className="text-sm text-white flex-1 truncate">Title: ULTIMATE GUIDE</span>
              <Eye className="size-4 text-slate-500 hover:text-white cursor-pointer" />
            </div>
            <div className="flex items-center gap-3 p-2 hover:bg-surface-lighter rounded border-l-2 border-transparent cursor-pointer">
              <User className="size-4 text-slate-400" />
              <span className="text-sm text-slate-300 flex-1 truncate">Subject Cutout</span>
              <Eye className="size-4 text-slate-500 hover:text-white cursor-pointer" />
            </div>
            <div className="flex items-center gap-3 p-2 hover:bg-surface-lighter rounded border-l-2 border-transparent cursor-pointer opacity-75">
              <ImageIcon className="size-4 text-slate-400" />
              <span className="text-sm text-slate-300 flex-1 truncate">Background Blur</span>
              <Lock className="size-4 text-slate-500 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function CanvasArea({ selectedFont, selectedWeight, isItalic }: { selectedFont: FontMetadata | null, selectedWeight: number, isItalic: boolean }) {
  const fontFamily = selectedFont ? `"${selectedFont.name}"` : 'var(--font-space-grotesk)';
  
  return (
    <main className="flex-1 bg-background-dark flex flex-col relative overflow-hidden">
      <div className="flex-1 flex items-center justify-center p-12 overflow-auto bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="relative w-[800px] aspect-video bg-black shadow-2xl group border border-surface-lighter ring-1 ring-black/50">
          <div className="absolute inset-0 bg-cover bg-center overflow-hidden" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBZCnCg8Ur-e-duG7zkM2q-45VkY4uVILN_3DfUs_UKXPugR3gho88yEpy415LE7BccxYFWH651BWv1cWK7k8x9jLHKu4Bm0GDnogti29dpvUkVngUK56XKtHIX4ukBMLm9rWsVOiDCE2ydZxLwDEHPCTjQDOU2B12OCxI8wOmB48ELgluTFgir3i7nKweV4XcYN-1xb5bduWThK_FGDiCARCwtmwdcimA2iXHJ9zuyChVd-tmC6xUW11FdwRsG5oVsWM1c0ItQIkEP')", filter: "blur(4px) brightness(0.6)" }}></div>
          
          <div className="absolute bottom-0 right-10 h-[110%] w-[45%] z-10">
            <img alt="Person portrait cutout" className="w-full h-full object-cover object-top" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyH1An3JDnMwOUqxxhdZPUoh-wGzVZ3dH5POprIqwaKOt4_gRrBMQv_lcRdDx164As3qzBKQGdy83Ky0gzDjWnMND2IRx9jnnhFc6tWUTMLvrP6RoHgKa94lzPc5fX2ZYYAc3ArTZSYZ3WfNfNLfy845xHRt7ZjSB5UNW44HVMkcXNQ7rFeYU5SGmXmdzdiP-bTPDzbLX8MH_-22rcYVC4Ich-In1ksSd7sXgu9clllPf6du-CyA4PA8VQTKNBJ7_mU1LreBv5LFIj" style={{ WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)", maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)", clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)", transform: "scaleX(-1)" }} />
            <div className="absolute inset-0 bg-primary/20 blur-3xl -z-10 rounded-full"></div>
          </div>

          <div className="absolute top-16 left-12 z-20 flex flex-col gap-0 select-none cursor-move border border-primary/50 hover:border-primary bg-primary/5 p-2 rounded">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-1 bg-primary rounded-full"></div>
            <h2 className={`text-7xl text-white tracking-tighter leading-[0.85] drop-shadow-[0_4px_0_#db2777] ${isItalic ? 'italic' : ''}`} style={{ textShadow: "4px 4px 0px #000", fontFamily, fontWeight: selectedWeight }}>
              ULTIMATE
            </h2>
            <h2 className={`text-8xl text-primary tracking-tighter leading-[0.85] drop-shadow-[0_4px_0_#db2777] ${isItalic ? 'italic' : ''}`} style={{ textShadow: "4px 4px 0px #000", fontFamily, fontWeight: selectedWeight }}>
              GUIDE
            </h2>
          </div>

          <div className="absolute top-8 right-8 z-20 rotate-12">
            <div className="bg-[#ff0055] text-white font-bold text-xl px-4 py-1 rounded shadow-lg border-2 border-white transform rotate-[-5deg]">
              NEW!
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-surface-dark/90 backdrop-blur border border-surface-lighter rounded-full px-4 py-2 text-xs text-slate-300 shadow-lg">
          Canvas: 1280 x 720 • Zoom: 62%
        </div>
      </div>
    </main>
  );
}

function RightSidebar({ 
  fonts, 
  selectedFont, 
  setSelectedFont,
  selectedWeight,
  setSelectedWeight,
  isItalic,
  setIsItalic
}: { 
  fonts: FontMetadata[], 
  selectedFont: FontMetadata | null, 
  setSelectedFont: (f: FontMetadata) => void,
  selectedWeight: number,
  setSelectedWeight: (w: number) => void,
  isItalic: boolean,
  setIsItalic: (v: boolean) => void
}) {
  const availableWeights = selectedFont 
    ? getWeightNumbers(selectedFont)
    : [400, 700, 900];

  return (
    <aside className="w-80 bg-surface-dark border-l border-surface-lighter flex flex-col shrink-0 z-40 overflow-y-auto">
      <div className="p-4 border-b border-surface-lighter bg-surface-lighter/10">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Text Properties</h2>
          <button className="text-slate-400 hover:text-white"><MoreHorizontal className="size-4" /></button>
        </div>
      </div>
      
      <div className="p-5 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-400">Font Family</label>
            <span className="text-[10px] text-primary cursor-pointer hover:underline">Browse Fonts</span>
          </div>
          <div className="relative">
            <select 
              className="w-full bg-surface-lighter border border-slate-700 text-white text-sm rounded-lg p-2.5 focus:ring-primary focus:border-primary appearance-none cursor-pointer outline-none"
              value={selectedFont?.name || ''}
              onChange={(e) => {
                const font = fonts.find(f => f.name === e.target.value);
                if (font) {
                  setSelectedFont(font);
                  const newWeights = getWeightNumbers(font);
                  if (!newWeights.includes(selectedWeight)) {
                    setSelectedWeight(newWeights[0] || 400);
                  }
                }
              }}
            >
              {fonts.length === 0 && <option value="">Loading fonts...</option>}
              {fonts.map(font => (
                <option key={font.name} value={font.name}>{font.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-2.5 text-slate-400 pointer-events-none size-4" />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-400 mb-1.5 block">Weight</label>
              <div className="relative">
                <select 
                  className="w-full bg-surface-lighter border border-slate-700 text-white text-sm rounded-lg p-2 focus:ring-primary focus:border-primary appearance-none outline-none"
                  value={selectedWeight}
                  onChange={(e) => setSelectedWeight(Number(e.target.value))}
                >
                  {availableWeights.map((w: number) => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-2.5 text-slate-400 pointer-events-none size-4" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 mb-1.5 block">Size</label>
              <div className="flex items-center bg-surface-lighter border border-slate-700 rounded-lg overflow-hidden">
                <input className="w-full bg-transparent border-0 text-white text-sm p-2 focus:ring-0 text-center outline-none" type="number" defaultValue="142" />
                <span className="text-xs text-slate-500 pr-2">px</span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 mb-1.5 block">Style</label>
            <div className="flex gap-2">
              <button 
                className={`flex-1 p-2 rounded-lg border transition-all text-sm font-medium ${
                  !isItalic 
                    ? 'bg-primary text-background-dark border-primary' 
                    : 'bg-surface-lighter border-slate-700 text-slate-400 hover:text-white'
                }`}
                onClick={() => setIsItalic(false)}
              >
                Regular
              </button>
              <button 
                className={`flex-1 p-2 rounded-lg border transition-all text-sm font-medium ${
                  isItalic 
                    ? 'bg-primary text-background-dark border-primary' 
                    : 'bg-surface-lighter border-slate-700 text-slate-400 hover:text-white'
                }`}
                onClick={() => setIsItalic(true)}
              >
                Italic
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Fill</label>
              <div className="flex items-center gap-2 bg-surface-lighter border border-slate-700 rounded p-1.5 cursor-pointer hover:border-slate-500">
                <div className="w-6 h-6 rounded bg-primary border border-white/20"></div>
                <span className="text-xs text-slate-300 font-mono">#F97316</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Stroke</label>
              <div className="flex items-center gap-2 bg-surface-lighter border border-slate-700 rounded p-1.5 cursor-pointer hover:border-slate-500">
                <div className="w-6 h-6 rounded bg-black border border-white/20 relative overflow-hidden">
                  <div className="absolute inset-0 border-2 border-red-500 rotate-45"></div>
                </div>
                <span className="text-xs text-slate-300 font-mono">None</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-surface-lighter">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Box className="text-secondary size-4" />
              3D & Depth
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
            <input className="range-slider" max="100" min="0" type="range" defaultValue="24" />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-slate-400">Shadow Distance</span>
              <span className="text-white font-mono">12px</span>
            </div>
            <input className="range-slider" max="50" min="0" type="range" defaultValue="12" />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-slate-400">Z-Rotation</span>
              <span className="text-white font-mono">-5°</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="text-slate-500 size-3" />
              <input className="range-slider" max="45" min="-45" type="range" defaultValue="-5" />
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
            <input className="range-slider" max="100" min="0" type="range" defaultValue="75" />
            <div className="flex gap-2 mt-3">
              <button className="flex-1 h-6 rounded bg-secondary/20 border border-secondary text-[10px] text-secondary hover:bg-secondary hover:text-white transition-colors">Soft</button>
              <button className="flex-1 h-6 rounded bg-surface-lighter border border-transparent text-[10px] text-slate-400 hover:text-white transition-colors">Hard</button>
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
            <input className="range-slider" max="20" min="0" type="range" defaultValue="4" />
          </div>
        </div>
      </div>
    </aside>
  );
}

export default function DepthThumbEditor() {
  const fontsList = Object.values(fontsMetadata as Record<string, FontMetadata>);
  const defaultFont = fontsList.find((f: FontMetadata) => f.name === 'Boska') || fontsList[0];
  const defaultWeights = getWeightNumbers(defaultFont);
  
  const [fonts, setFonts] = useState<FontMetadata[]>(fontsList);
  const [selectedFont, setSelectedFont] = useState<FontMetadata | null>(defaultFont);
  const [selectedWeight, setSelectedWeight] = useState<number>(
    defaultWeights.includes(900) ? 900 : 
    defaultWeights.includes(700) ? 700 : 
    defaultWeights[0] || 400
  );
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const { insertFontStyles } = useDynamicFontStyles();

  useEffect(() => {
    if (selectedFont) {
      insertFontStyles(selectedFont.name, selectedFont);
    }
  }, [selectedFont, insertFontStyles]);

  return (
    <div className="bg-background-dark text-slate-100 font-sans overflow-hidden h-screen flex flex-col selection:bg-primary/30">
      <Header />
      <div className="flex flex-1 overflow-hidden relative">
        <LeftSidebar />
        <CanvasArea 
          selectedFont={selectedFont} 
          selectedWeight={selectedWeight}
          isItalic={isItalic}
        />
        <RightSidebar 
          fonts={fonts} 
          selectedFont={selectedFont} 
          setSelectedFont={setSelectedFont}
          selectedWeight={selectedWeight}
          setSelectedWeight={setSelectedWeight}
          isItalic={isItalic}
          setIsItalic={setIsItalic}
        />
      </div>
    </div>
  );
}
