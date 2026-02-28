'use client';

import * as React from 'react';
import { X, Sparkles } from 'lucide-react';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ComingSoonModal({ isOpen, onClose }: ComingSoonModalProps) {
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
      <div className="relative bg-surface-dark border border-surface-lighter rounded-xl shadow-2xl w-[400px] max-w-[90vw] p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-surface-lighter rounded transition-colors"
          aria-label="Close modal"
        >
          <X className="size-5 text-slate-400 hover:text-white" />
        </button>

        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Sparkles className="size-8 text-primary" />
          </div>
          
          <h2 className="text-2xl font-bold text-white">Coming Soon</h2>
          
          <p className="text-slate-400 text-sm leading-relaxed">
            AI-powered content generation is under development. Stay tuned for amazing features!
          </p>
          
          <button
            type="button"
            onClick={onClose}
            className="mt-2 px-6 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-background-dark font-bold text-sm transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:shadow-[0_0_20px_rgba(249,115,22,0.5)]"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
