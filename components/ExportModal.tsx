'use client';

import * as React from 'react';
import { Lock, Download, X } from 'lucide-react';
import { generateFilename, exportToPng } from '../lib/export-utils';
import { useEditor } from '../lib/editor-context';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  canvasWidth: number;
  canvasHeight: number;
}

export function ExportModal({ isOpen, onClose, canvasWidth, canvasHeight }: ExportModalProps) {
  const { backgroundColor } = useEditor();
  const [includeBackground, setIncludeBackground] = React.useState(true);
  const [isExporting, setIsExporting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const filename = React.useMemo(() => generateFilename(), []);

  const handleExport = async () => {
    setIsExporting(true);
    setError(null);

    try {
      const canvasElement = document.getElementById('export-canvas');
      if (!canvasElement) {
        throw new Error('Canvas element not found');
      }

      await exportToPng(canvasElement, {
        includeBackground,
        canvasWidth,
        canvasHeight,
        filename,
        backgroundColor,
      });

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed');
    } finally {
      setIsExporting(false);
    }
  };

  React.useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="relative bg-surface-dark border border-surface-lighter rounded-xl shadow-2xl w-[400px] max-w-[90vw] p-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-surface-lighter rounded transition-colors"
          aria-label="Close modal"
        >
          <X className="size-5 text-slate-400 hover:text-white" />
        </button>

        <h2 className="text-xl font-bold text-white mb-6">Export Image</h2>

        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-slate-300 mb-2 block">Resolution</label>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-3 bg-surface-lighter/50 rounded-lg cursor-pointer hover:bg-surface-lighter transition-colors">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="resolution"
                    defaultChecked
                    className="size-4 accent-primary"
                  />
                  <span className="text-white text-sm font-medium">
                    {canvasWidth} × {canvasHeight} (Original)
                  </span>
                </div>
                <span className="text-xs text-slate-400">Current</span>
              </label>
              <label className="flex items-center justify-between p-3 bg-background-dark border border-surface-lighter rounded-lg opacity-50 cursor-not-allowed">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="resolution"
                    disabled
                    className="size-4 accent-primary"
                  />
                  <span className="text-slate-400 text-sm font-medium">
                    3840 × 2160 (4K)
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-primary">
                  <Lock className="size-3" />
                  <span className="font-medium">Pro</span>
                </div>
              </label>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-3 p-3 bg-surface-lighter/50 rounded-lg cursor-pointer hover:bg-surface-lighter transition-colors">
              <input
                type="checkbox"
                id="includeBackground"
                checked={includeBackground}
                onChange={(e) => setIncludeBackground(e.target.checked)}
                className="size-4 accent-primary"
              />
              <span className="text-white text-sm font-medium">Include background</span>
            </label>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300 mb-2 block">Filename</label>
            <div className="p-3 bg-background-dark border border-surface-lighter rounded-lg">
              <code className="text-xs text-slate-400 break-all">{filename}</code>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isExporting}
              className="flex-1 px-4 py-2.5 rounded-lg bg-surface-lighter text-slate-300 font-medium text-sm hover:bg-surface-lighter/80 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleExport}
              disabled={isExporting}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-background-dark font-bold text-sm transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:shadow-[0_0_20px_rgba(249,115,22,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? (
                <>
                  <svg className="animate-spin size-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Exporting...</span>
                </>
              ) : (
                <>
                  <Download className="size-4" />
                  <span>Export PNG</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
