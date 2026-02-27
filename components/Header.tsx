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

export function Header() {
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
        <button type="button" className="p-2 hover:bg-surface-lighter rounded text-slate-400 hover:text-white transition-colors" title="Select">
          <MousePointer2 className="size-5" />
        </button>
        <button type="button" className="p-2 hover:bg-surface-lighter rounded text-slate-400 hover:text-white transition-colors" title="Hand Tool">
          <Hand className="size-5" />
        </button>
        <div className="w-px h-4 bg-surface-lighter"></div>
        <button type="button" className="flex items-center gap-2 px-3 py-1.5 hover:bg-surface-lighter rounded text-sm font-medium text-slate-300 hover:text-white transition-colors">
          <span>100%</span>
          <ChevronDown className="size-4" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button type="button" className="flex items-center justify-center size-9 rounded-lg bg-surface-lighter text-slate-300 hover:bg-surface-lighter/80 hover:text-white transition-colors border border-transparent hover:border-slate-600" title="Safe Zones">
            <Grid className="size-5" />
          </button>
          <button type="button" className="flex items-center justify-center size-9 rounded-lg bg-surface-lighter text-slate-300 hover:bg-surface-lighter/80 hover:text-white transition-colors border border-transparent hover:border-slate-600" title="Preview">
            <Play className="size-5" />
          </button>
        </div>
        <button type="button" className="flex items-center justify-center gap-2 h-10 px-6 rounded-lg bg-primary hover:bg-primary/90 text-background-dark font-bold text-sm transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:shadow-[0_0_20px_rgba(249,115,22,0.5)]">
          <Download className="size-5" />
          <span>Export</span>
        </button>
        <div className="bg-center bg-no-repeat bg-cover rounded-full size-9 ring-2 ring-surface-lighter cursor-pointer ml-2" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBNMx-qk_-oYoMbXkulddTM__Q9EiEbFnmbK6xXznLxuwOYZNjSRSb82wKAO3KtGQpd09l8cAc4SpgB32etL-ERk0AVmtdXdoXPiV97TB_muNaAQn452sDyTKpoMKoyS3ec0AvojaZmN28cARy_4-ir2U3uTMFi2IW0JDxQ6ZpSpXSYu1BUIYx3rPrWtiziYp1DcuD54VkBRHGdr067Ag8MmtHOIXNwxfc1qYoa-zyHehruvtaQoH80zTENz3jvLCvEHfMnviJ6eoCj")' }}></div>
      </div>
    </header>
  );
}
