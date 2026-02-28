'use client';

import * as React from 'react';
import {
  Box,
  MousePointer2,
  Hand,
  ChevronDown,
  Grid,
  Play,
  Download,
} from 'lucide-react';
import { useEditor } from '../lib/editor-context';
import { type ToolType } from '../lib/editor-types';
import { ExportModal } from './ExportModal';
import { PreviewModal } from './PreviewModal';

export function Header() {
  const { activeTool, setTool, zoom, setZoom, canvasWidth, canvasHeight, showSafeZones, isPreviewMode, toggleSafeZones, togglePreviewMode } = useEditor();
  const [showZoomMenu, setShowZoomMenu] = React.useState(false);
  const [showExportModal, setShowExportModal] = React.useState(false);
  const zoomDropdownRef = React.useRef<HTMLDivElement>(null);

  const handleToolClick = (tool: ToolType) => {
    setTool(tool);
  };

  const handleZoomChange = (newZoom: number) => {
    setTool('select');
    setZoom(newZoom);
    setShowZoomMenu(false);
  };

  const handleFitToScreen = () => {
    setTool('select');
    const container = document.querySelector('.canvas-scroll-container') as HTMLElement;
    if (container) {
      const containerWidth = container.clientWidth - 96;
      const containerHeight = container.clientHeight - 96;
      const widthRatio = containerWidth / 1280;
      const heightRatio = containerHeight / 720;
      const fitZoom = Math.min(widthRatio, heightRatio) * 100;
      setZoom(Math.max(10, Math.min(200, Math.round(fitZoom))));
    }
    setShowZoomMenu(false);
  };

  const zoomOptions = [
    { value: 25, label: '25%' },
    { value: 50, label: '50%' },
    { value: 75, label: '75%' },
    { value: 100, label: '100%' },
    { value: 150, label: '150%' },
    { value: 200, label: '200%' },
    { value: 0, label: 'Fit to screen', separator: true },
  ];

  const currentZoomLabel = zoomOptions.find(o => o.value === zoom)?.label || `${zoom}%`;

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (zoomDropdownRef.current && !zoomDropdownRef.current.contains(event.target as Node)) {
        setShowZoomMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        <button 
          type="button" 
          onClick={() => handleToolClick('select')}
          className={`p-2 rounded transition-colors ${activeTool === 'select' ? 'bg-surface-lighter text-white' : 'text-slate-400 hover:bg-surface-lighter hover:text-white'}`} 
          title="Select"
        >
          <MousePointer2 className="size-5" />
        </button>
        <button 
          type="button" 
          onClick={() => handleToolClick('hand')}
          className={`p-2 rounded transition-colors ${activeTool === 'hand' ? 'bg-surface-lighter text-white' : 'text-slate-400 hover:bg-surface-lighter hover:text-white'}`} 
          title="Hand Tool"
        >
          <Hand className="size-5" />
        </button>
        <div className="w-px h-4 bg-surface-lighter"></div>
        <div ref={zoomDropdownRef} className="relative">
          <button 
            type="button" 
            onClick={() => setShowZoomMenu(!showZoomMenu)}
            className="flex items-center gap-2 px-3 py-1.5 hover:bg-surface-lighter rounded text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            <span>{currentZoomLabel}</span>
            <ChevronDown className="size-4" />
          </button>
          {showZoomMenu && (
            <div className="absolute top-full left-0 mt-1 bg-background-dark border border-surface-lighter rounded-lg shadow-xl overflow-hidden min-w-[120px] z-50">
              {zoomOptions.map((option) => (
                option.separator ? (
                  <div key="separator" className="border-t border-surface-lighter my-1"></div>
                ) : (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleZoomChange(option.value)}
                    className={`w-full px-3 py-2 text-left text-sm font-medium transition-colors ${zoom === option.value ? 'bg-surface-lighter text-white' : 'text-slate-300 hover:bg-surface-lighter hover:text-white'}`}
                  >
                    {option.label}
                  </button>
                )
              ))}
              <button
                type="button"
                onClick={handleFitToScreen}
                className="w-full px-3 py-2 text-left text-sm font-medium text-slate-300 hover:bg-surface-lighter hover:text-white transition-colors"
              >
                Fit to screen
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button 
            type="button" 
            onClick={toggleSafeZones}
            className={`flex items-center justify-center size-9 rounded-lg transition-colors border ${showSafeZones ? 'bg-primary text-background-dark border-primary' : 'bg-surface-lighter text-slate-300 hover:bg-surface-lighter/80 hover:text-white border-transparent hover:border-slate-600'}`} 
            title="Safe Zones"
          >
            <Grid className="size-5" />
          </button>
          <button 
            type="button" 
            onClick={togglePreviewMode}
            className={`flex items-center justify-center size-9 rounded-lg transition-colors border ${isPreviewMode ? 'bg-primary text-background-dark border-primary' : 'bg-surface-lighter text-slate-300 hover:bg-surface-lighter/80 hover:text-white border-transparent hover:border-slate-600'}`} 
            title="Preview"
          >
            <Play className="size-5" />
          </button>
        </div>
        <button type="button" onClick={() => setShowExportModal(true)} className="flex items-center justify-center gap-2 h-10 px-6 rounded-lg bg-primary hover:bg-primary/90 text-background-dark font-bold text-sm transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:shadow-[0_0_20px_rgba(249,115,22,0.5)]">
          <Download className="size-5" />
          <span>Export</span>
        </button>
        <div className="bg-center bg-no-repeat bg-cover rounded-full size-9 ring-2 ring-surface-lighter cursor-pointer ml-2" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBNMx-qk_-oYoMbXkulddTM__Q9EiEbFnmbK6xXznLxuwOYZNjSRSb82wKAO3KtGQpd09l8cAc4SpgB32etL-ERk0AVmtdXdoXPiV97TB_muNaAQn452sDyTKpoMKoyS3ec0AvojaZmN28cARy_4-ir2U3uTMFi2IW0JDxQ6ZpSpXSYu1BUIYx3rPrWtiziYp1DcuD54VkBRHGdr067Ag8MmtHOIXNwxfc1qYoa-zyHehruvtaQoH80zTENz3jvLCvEHfMnviJ6eoCj")' }}></div>
      </div>
      <ExportModal 
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
      />
      <PreviewModal 
        isOpen={isPreviewMode}
        onClose={togglePreviewMode}
      />
    </header>
  );
}
