'use client';

import * as React from 'react';
import { X, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { useEditor } from '../lib/editor-context';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PreviewModal({ isOpen, onClose }: PreviewModalProps) {
  const { canvasWidth, canvasHeight, backgroundColor, backgroundImage, backgroundBlur, backgroundBrightness, elements } = useEditor();
  const [previewZoom, setPreviewZoom] = React.useState(100);

  const canvasElement = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleZoomIn = () => {
    setPreviewZoom(prev => Math.min(300, prev + 25));
  };

  const handleZoomOut = () => {
    setPreviewZoom(prev => Math.max(50, prev - 25));
  };

  const handleResetZoom = () => {
    setPreviewZoom(100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="relative flex flex-col max-w-[95vw] max-h-[95vh]">
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <div className="flex items-center gap-1 bg-surface-dark/90 backdrop-blur border border-surface-lighter rounded-lg p-1">
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1.5 hover:bg-surface-lighter rounded text-slate-300 hover:text-white transition-colors"
              title="Zoom out"
            >
              <ZoomOut className="size-4" />
            </button>
            <span className="px-2 text-sm font-medium text-slate-300 w-12 text-center">
              {previewZoom}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1.5 hover:bg-surface-lighter rounded text-slate-300 hover:text-white transition-colors"
              title="Zoom in"
            >
              <ZoomIn className="size-4" />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              className="p-1.5 hover:bg-surface-lighter rounded text-slate-300 hover:text-white transition-colors"
              title="Reset zoom"
            >
              <Maximize2 className="size-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-surface-lighter rounded text-slate-300 hover:text-white transition-colors bg-surface-dark/90 backdrop-blur border border-surface-lighter"
            aria-label="Close preview"
            title="Close (ESC)"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="bg-background-dark border border-surface-lighter rounded-xl shadow-2xl overflow-auto max-h-[85vh]">
          <div 
            ref={canvasElement}
            className="relative"
            style={{ 
              width: `${canvasWidth * previewZoom / 100}px`,
              aspectRatio: `${canvasWidth} / ${canvasHeight}`,
              minWidth: canvasWidth,
              minHeight: canvasHeight,
              backgroundColor
            }}
          >
            {backgroundImage && (
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: `url('${backgroundImage}')`,
                  filter: `blur(${backgroundBlur}px) brightness(${backgroundBrightness})`
                }}
              />
            )}

            {elements
              .filter(el => el.visible)
              .sort((a, b) => a.zIndex - b.zIndex)
              .map((element) => (
                <PreviewElement key={element.id} element={element} />
              ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-3 text-xs text-slate-400">
          <span className="px-2 py-1 bg-surface-dark/90 backdrop-blur border border-surface-lighter rounded">
            {canvasWidth} × {canvasHeight} • Press ESC to close
          </span>
        </div>
      </div>
    </div>
  );
}

interface PreviewElementProps {
  element: any;
}

function PreviewElement({ element }: PreviewElementProps) {
  const baseStyle = {
    position: 'absolute' as const,
    left: element.position.x,
    top: element.position.y,
    width: element.width,
    height: element.height,
    transform: `rotate(${element.rotation}deg)`,
    opacity: element.opacity,
  };

  if (element.type === 'text') {
    const { content } = element;
    return (
      <div
        style={{
          ...baseStyle,
          color: content.fill,
          fontSize: content.fontSize,
          fontFamily: `"${content.fontFamily}"`,
          fontWeight: content.fontWeight,
          fontStyle: content.isItalic ? 'italic' : 'normal',
          lineHeight: content.lineHeight,
          letterSpacing: content.letterSpacing,
          ...(content.strokeWidth > 0 && {
            WebkitTextStroke: `${content.strokeWidth}px ${content.stroke}`,
          }),
          ...(content.shadowEnabled && {
            textShadow: `4px 4px 0px ${content.stroke}`,
          }),
          ...(content.zRotation !== 0 && {
            transform: `rotate(${element.rotation}deg) rotateZ(${content.zRotation}deg)`,
          }),
        }}
      >
        {content.text}
      </div>
    );
  }

  if (element.type === 'image') {
    const { content } = element;
    return (
      <div
        style={{
          ...baseStyle,
          overflow: 'hidden',
        }}
      >
        <img
          src={content.src}
          alt={element.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: content.objectFit,
            transform: `${content.flipX ? 'scaleX(-1)' : ''} ${content.flipY ? 'scaleY(-1)' : ''}`,
          }}
        />
      </div>
    );
  }

  if (element.type === 'shape') {
    const { content } = element;
    const shapeStyle: any = {
      ...baseStyle,
      backgroundColor: content.fill,
      border: content.strokeWidth > 0 ? `${content.strokeWidth}px solid ${content.stroke}` : undefined,
    };

    if (content.shapeType === 'circle') {
      shapeStyle.borderRadius = '50%';
    } else if (content.shapeType === 'badge') {
      shapeStyle.borderRadius = '9999px';
    } else if (content.shapeType === 'squircle') {
      shapeStyle.borderRadius = '24px';
    } else if (content.shapeType === 'rounded-rectangle') {
      shapeStyle.borderRadius = '8px';
    } else {
      shapeStyle.borderRadius = '0';
    }

    return (
      <div style={shapeStyle}>
        {content.text && (
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
            {content.text}
          </div>
        )}
      </div>
    );
  }

  return null;
}
