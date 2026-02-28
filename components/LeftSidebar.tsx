'use client';

import React, { useState, useCallback, useRef } from 'react';
import {
  UploadCloud,
  Type,
  Sparkles,
  Shapes,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Trash2,
  Copy,
  Plus
} from 'lucide-react';
import { useEditor } from '../lib/editor-context';
import { type EditorElement, type TextContent, type ImageElement, type ShapeElement } from '../lib/editor-types';
import { type FontMetadata } from '../lib/font-utils';
import { ComingSoonModal } from './ComingSoonModal';
import { Square, Circle, Shield } from 'lucide-react';

interface LeftSidebarProps {
  selectedFont?: FontMetadata | null;
}

export function LeftSidebar({ selectedFont }: LeftSidebarProps) {
  const { elements, selectedElementId, selectElement, toggleVisibility, toggleLock, duplicateElement, removeElement, updateElement, addElement, setCanvasSize, canvasWidth, canvasHeight, isPreviewMode } = useEditor();
  const [activeTab, setActiveTab] = useState<'assets' | 'layers'>('assets');
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragStart = useCallback((e: React.DragEvent, elementId: string) => {
    e.dataTransfer.setData('text/plain', elementId);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');
    if (draggedId === targetId) return;

    const fromIndex = elements.findIndex(el => el.id === draggedId);
    const toIndex = elements.findIndex(el => el.id === targetId);

    if (fromIndex !== -1 && toIndex !== -1) {
      const newElements = [...elements];
      const [removed] = newElements.splice(fromIndex, 1);
      newElements.splice(toIndex, 0, removed);
      newElements.forEach((el, i) => {
        updateElement(el.id, { zIndex: i });
      });
    }
  }, [elements, updateElement]);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleAIGenClick = useCallback(() => {
    setShowComingSoonModal(true);
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(canvasWidth / img.width, canvasHeight / img.height) * 0.8;
        const newWidth = img.width * scale;
        const newHeight = img.height * scale;
        const newX = (canvasWidth - newWidth) / 2;
        const newY = (canvasHeight - newHeight) / 2;

        const newElement: EditorElement = {
          id: `el-${Date.now()}`,
          name: file.name.replace(/\.[^/.]+$/, ''),
          type: 'image',
          position: { x: newX, y: newY },
          width: newWidth,
          height: newHeight,
          rotation: 0,
          opacity: 1,
          zIndex: elements.length,
          visible: true,
          locked: false,
          depthEnabled: false,
          extrusionDepth: 24,
          shadowDistance: 12,
          zRotation: -5,
          neonGlowEnabled: true,
          neonGlowIntensity: 75,
          neonGlowType: 'soft',
          smartBlurIntensity: 0,
          content: {
            src,
            objectFit: 'contain',
            flipX: false,
            flipY: false
          }
        };

        addElement(newElement);
        setActiveTab('layers');
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  }, [canvasWidth, canvasHeight, elements.length, addElement]);

  const addShapeElement = useCallback((shapeType: 'rectangle' | 'rounded-rectangle' | 'circle' | 'squircle' | 'badge') => {
    const newElement: EditorElement = {
      id: `el-${Date.now()}`,
      name: `${shapeType.charAt(0).toUpperCase() + shapeType.slice(1).replace('-', ' ')}`,
      type: 'shape',
      position: { x: 100, y: 100 },
      width: 200,
      height: 200,
      rotation: 0,
      opacity: 1,
      zIndex: elements.length,
      visible: true,
      locked: false,
      depthEnabled: false,
      extrusionDepth: 24,
      shadowDistance: 12,
      zRotation: -5,
      neonGlowEnabled: true,
      neonGlowIntensity: 75,
      neonGlowType: 'soft',
      smartBlurIntensity: 0,
      content: {
        shapeType,
        fill: '#6366f1',
        stroke: '#4f46e5',
        strokeWidth: 2,
        rotation: 0
      }
    };

    addElement(newElement);
    setActiveTab('layers');
  }, [elements.length, addElement]);

  const addTextElement = useCallback(() => {
    const newElement: EditorElement = {
      id: `el-${Date.now()}`,
      name: 'New Text',
      type: 'text',
      position: { x: 100, y: 100 },
      width: 300,
      height: 100,
      rotation: 0,
      opacity: 1,
      zIndex: elements.length,
      visible: true,
      locked: false,
      depthEnabled: false,
      extrusionDepth: 24,
      shadowDistance: 12,
      zRotation: -5,
      neonGlowEnabled: true,
      neonGlowIntensity: 75,
      neonGlowType: 'soft',
      smartBlurIntensity: 0,
      content: {
        text: 'Add text here',
        fontSize: 48,
        fontFamily: selectedFont?.name || 'Inter',
        fontWeight: 700,
        isItalic: false,
        fill: '#ffffff',
        stroke: '#000000',
        strokeWidth: 0,
        shadowEnabled: false,
        lineHeight: 1.2,
        letterSpacing: 0
      }
    };

    addElement(newElement);
    setActiveTab('layers');
  }, [elements.length, selectedFont, addElement]);

  const getLayerIcon = (type: string) => {
    switch (type) {
      case 'text':
        return <Type className="size-4" />;
      case 'image':
        return <Shapes className="size-4" />;
      case 'shape':
        return <Shapes className="size-4" />;
      default:
        return <Type className="size-4" />;
    }
  };

  return (
    <aside className="w-72 flex flex-col bg-surface-dark border-r border-surface-lighter z-40 shrink-0">
      <div className="flex border-b border-surface-lighter">
        <button 
          type="button"
          onClick={() => setActiveTab('assets')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'assets' 
              ? 'text-primary border-b-2 border-primary bg-surface-lighter/50' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-surface-lighter/30'
          }`}
        >
          Assets
        </button>
        <button 
          type="button"
          onClick={() => setActiveTab('layers')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'layers' 
              ? 'text-primary border-b-2 border-primary bg-surface-lighter/50' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-surface-lighter/30'
          }`}
        >
          Layers
        </button>
      </div>
      
      {activeTab === 'assets' ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Canvas Size</h3>
            <div className="grid grid-cols-5 gap-2">
              {[
                { label: '16:9', width: 1280, height: 720, name: 'YouTube' },
                { label: '9:16', width: 1080, height: 1920, name: 'Shorts/Reels' },
                { label: '1:1', width: 1080, height: 1080, name: 'Instagram Square' },
                { label: '4:5', width: 1080, height: 1350, name: 'Instagram Portrait' },
                { label: '4:3', width: 1440, height: 1080, name: 'Classic' }
              ].map((preset) => {
                const isActive = canvasWidth === preset.width && canvasHeight === preset.height;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setCanvasSize(preset.width, preset.height)}
                    className={`flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-all ${
                      isActive 
                        ? 'bg-primary text-background-dark font-bold' 
                        : 'bg-surface-lighter text-slate-300 hover:bg-surface-lighter/80'
                    }`}
                    title={preset.name}
                  >
                    <span className="text-xs">{preset.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <button type="button" onClick={handleUploadClick} className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg hover:bg-surface-lighter text-slate-400 hover:text-primary transition-colors group">
              <UploadCloud className="size-5 group-hover:scale-110 transition-transform" />
              <span className="text-[10px]">Upload</span>
            </button>
            <button type="button" onClick={addTextElement} className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg bg-surface-lighter text-primary transition-colors">
              <Type className="size-5" />
              <span className="text-[10px]">Text</span>
            </button>
            <button type="button" onClick={handleAIGenClick} className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg hover:bg-surface-lighter text-slate-400 hover:text-primary transition-colors group">
              <Sparkles className="size-5 group-hover:scale-110 transition-transform" />
              <span className="text-[10px]">AI Gen</span>
            </button>
            <button type="button" className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg bg-surface-lighter text-primary transition-colors">
              <Shapes className="size-5" />
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
                <button
                  type="button"
                  key={template.name}
                  className="aspect-video bg-slate-800 rounded border border-slate-700 hover:border-primary cursor-pointer relative group overflow-hidden"
                  aria-label={`Use ${template.name} template`}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                    }
                  }}
                >
                  <div className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:opacity-100 transition-opacity" style={{ backgroundImage: `url('${template.url}')` }}></div>
                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-2 text-[10px] text-white font-medium">{template.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Shapes</h3>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => addShapeElement('rectangle')}
                className="flex flex-col items-center justify-center gap-2 p-3 bg-surface-lighter rounded border border-slate-700 hover:border-primary hover:bg-surface-lighter/80 transition-all group"
                aria-label="Add Rectangle shape"
              >
                <div className="w-12 h-12 bg-primary/20 group-hover:bg-primary/30 rounded-none flex items-center justify-center transition-colors">
                  <Square className="size-6 text-primary" />
                </div>
                <span className="text-[10px] text-slate-300 group-hover:text-white transition-colors">Rectangle</span>
              </button>
              <button
                type="button"
                onClick={() => addShapeElement('rounded-rectangle')}
                className="flex flex-col items-center justify-center gap-2 p-3 bg-surface-lighter rounded border border-slate-700 hover:border-primary hover:bg-surface-lighter/80 transition-all group"
                aria-label="Add Rounded Rectangle shape"
              >
                <div className="w-12 h-12 bg-primary/20 group-hover:bg-primary/30 rounded-md flex items-center justify-center transition-colors">
                  <Square className="size-6 text-primary" />
                </div>
                <span className="text-[10px] text-slate-300 group-hover:text-white transition-colors">Rounded</span>
              </button>
              <button
                type="button"
                onClick={() => addShapeElement('squircle')}
                className="flex flex-col items-center justify-center gap-2 p-3 bg-surface-lighter rounded border border-slate-700 hover:border-primary hover:bg-surface-lighter/80 transition-all group"
                aria-label="Add Squircle shape"
              >
                <div className="w-12 h-12 bg-primary/20 group-hover:bg-primary/30 rounded-[2rem] flex items-center justify-center transition-colors">
                  <Square className="size-6 text-primary" />
                </div>
                <span className="text-[10px] text-slate-300 group-hover:text-white transition-colors">Squircle</span>
              </button>
              <button
                type="button"
                onClick={() => addShapeElement('circle')}
                className="flex flex-col items-center justify-center gap-2 p-3 bg-surface-lighter rounded border border-slate-700 hover:border-primary hover:bg-surface-lighter/80 transition-all group"
                aria-label="Add Circle shape"
              >
                <div className="w-12 h-12 bg-primary/20 group-hover:bg-primary/30 rounded-full flex items-center justify-center transition-colors">
                  <Circle className="size-6 text-primary" />
                </div>
                <span className="text-[10px] text-slate-300 group-hover:text-white transition-colors">Circle</span>
              </button>
              <button
                type="button"
                onClick={() => addShapeElement('badge')}
                className="flex flex-col items-center justify-center gap-2 p-3 bg-surface-lighter rounded border border-slate-700 hover:border-primary hover:bg-surface-lighter/80 transition-all group"
                aria-label="Add Badge shape"
              >
                <div className="w-12 h-12 bg-primary/20 group-hover:bg-primary/30 rounded-3xl flex items-center justify-center transition-colors">
                  <Shield className="size-6 text-primary" />
                </div>
                <span className="text-[10px] text-slate-300 group-hover:text-white transition-colors">Badge</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Layers</h3>
            <button type="button" onClick={addTextElement} className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors">
              <Plus className="size-3" />
              <span className="text-[10px]">Add</span>
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {[...elements].reverse().map((element) => (
              <button
                type="button"
                key={element.id}
                draggable
                onDragStart={(e) => handleDragStart(e, element.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, element.id)}
                onClick={() => selectElement(element.id)}
                className={`flex items-center gap-3 p-2 rounded cursor-pointer transition-colors w-full text-left ${
                  selectedElementId === element.id 
                    ? 'bg-surface-lighter border-l-2 border-primary' 
                    : 'hover:bg-surface-lighter border-l-2 border-transparent'
                } ${!element.visible ? 'opacity-50' : ''}`}
              >
                {getLayerIcon(element.type)}
                <span className={`text-sm flex-1 truncate ${selectedElementId === element.id ? 'text-white' : 'text-slate-300'}`}>
                  {element.name}
                </span>
                <div className="flex items-center gap-1">
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      duplicateElement(element.id);
                    }}
                    className="p-1 hover:text-white text-slate-500 transition-colors"
                    title="Duplicate"
                  >
                    <Copy className="size-3.5" />
                  </button>
                  {!element.locked && (
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleVisibility(element.id);
                      }}
                      className="p-1 hover:text-white text-slate-500 transition-colors"
                      title={element.visible ? 'Hide' : 'Show'}
                    >
                      {element.visible ? <Eye className="size-3.5" /> : <EyeOff className="size-3.5" />}
                    </button>
                  )}
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLock(element.id);
                    }}
                    className="p-1 hover:text-white text-slate-500 transition-colors"
                    title={element.locked ? 'Unlock' : 'Lock'}
                  >
                    {element.locked ? <Lock className="size-3.5" /> : <Unlock className="size-3.5" />}
                  </button>
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Delete "${element.name}"?`)) {
                        removeElement(element.id);
                      }
                    }}
                    className="p-1 hover:text-red-400 text-slate-500 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </button>
            ))}
            {elements.length === 0 && (
              <div className="text-center py-8 text-slate-500 text-sm">
                No layers yet.<br />Add elements to get started.
              </div>
            )}
          </div>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <ComingSoonModal isOpen={showComingSoonModal} onClose={() => setShowComingSoonModal(false)} />
    </aside>
  );
}
