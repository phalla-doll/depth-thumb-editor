'use client';

import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { 
  type EditorState, 
  type EditorActions, 
  type EditorContext, 
  type EditorElement,
  type TextElement,
  type ImageElement
} from './editor-types';

const generateId = (): string => {
  return `el-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const DEFAULT_CANVAS_WIDTH = 1280;
const DEFAULT_CANVAS_HEIGHT = 720;

const createDefaultElements = (): EditorElement[] => {
  const textElement: TextElement = {
    id: generateId(),
    name: 'Title: ULTIMATE GUIDE',
    type: 'text',
    position: { x: 48, y: 64 },
    width: 600,
    height: 200,
    rotation: 0,
    opacity: 1,
    zIndex: 2,
    visible: true,
    locked: false,
    content: {
      text: 'ULTIMATE\nGUIDE',
      fontSize: 96,
      fontFamily: 'Boska',
      fontWeight: 900,
      isItalic: false,
      fill: '#F97316',
      stroke: '#000000',
      strokeWidth: 4,
      lineHeight: 0.85,
      letterSpacing: -2
    }
  };

  const imageElement: ImageElement = {
    id: generateId(),
    name: 'Subject Cutout',
    type: 'image',
    position: { x: 400, y: -36 },
    width: 360,
    height: 792,
    rotation: 0,
    opacity: 1,
    zIndex: 1,
    visible: true,
    locked: false,
    content: {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyH1An3JDnMwOUqxxhdZPUoh-wGzVZ3dH5POprIqwaKOt4_gRrBMQv_lcRdDx164As3qzBKQGdy83Ky0gzDjWnMND2IRx9jnnhFc6tWUTMLvrP6RoHgKa94lzPc5fX2ZYYAc3ArTZSYZ3WfNfNLfy845xHRt7ZjSB5UNW44HVMkcXNQ7rFeYU5SGmXmdzdiP-bTPDzbLX8MH_-22rcYVC4Ich-In1ksSd7sXgu9clllPf6du-CyA4PA8VQTKNBJ7_mU1LreBv5LFIj',
      objectFit: 'cover',
      flipX: true,
      flipY: false,
      maskGradient: 'linear-gradient(to bottom, black 80%, transparent 100%)'
    }
  };

  return [imageElement, textElement];
};

const initialState: EditorState = {
  elements: createDefaultElements(),
  selectedElementId: null,
  canvasWidth: DEFAULT_CANVAS_WIDTH,
  canvasHeight: DEFAULT_CANVAS_HEIGHT,
  zoom: 62,
  backgroundColor: '#000000',
  backgroundImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZCnCg8Ur-e-duG7zkM2q-45VkY4uVILN_3DfUs_UKXPugR3gho88yEpy415LE7BccxYFWH651BWv1cWK7k8x9jLHKu4Bm0GDnogti29dpvUkVngUK56XKtHIX4ukBMLm9rWsVOiDCE2ydZxLwDEHPCTjQDOU2B12OCxI8wOmB48ELgluTFgir3i7nKweV4XcYN-1xb5bduWThK_FGDiCARCwtmwdcimA2iXHJ9zuyChVd-tmC6xUW11FdwRsG5oVsWM1c0ItQIkEP',
  backgroundBlur: 4,
  backgroundBrightness: 0.6
};

const EditorContextInstance = createContext<EditorContext | null>(null);

export function EditorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<EditorState>(initialState);

  const addElement = useCallback((element: EditorElement) => {
    setState(prev => ({
      ...prev,
      elements: [...prev.elements, { ...element, zIndex: prev.elements.length }]
    }));
  }, []);

  const updateElement = useCallback((id: string, updates: Partial<EditorElement>) => {
    setState(prev => ({
      ...prev,
      elements: prev.elements.map(el => 
        el.id === id ? { ...el, ...updates } as EditorElement : el
      )
    }));
  }, []);

  const removeElement = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== id),
      selectedElementId: prev.selectedElementId === id ? null : prev.selectedElementId
    }));
  }, []);

  const reorderElements = useCallback((fromIndex: number, toIndex: number) => {
    setState(prev => {
      const newElements = [...prev.elements];
      const [removed] = newElements.splice(fromIndex, 1);
      newElements.splice(toIndex, 0, removed);
      return { ...prev, elements: newElements };
    });
  }, []);

  const selectElement = useCallback((id: string | null) => {
    setState(prev => ({ ...prev, selectedElementId: id }));
  }, []);

  const toggleVisibility = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      elements: prev.elements.map(el => 
        el.id === id ? { ...el, visible: !el.visible } : el
      )
    }));
  }, []);

  const toggleLock = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      elements: prev.elements.map(el => 
        el.id === id ? { ...el, locked: !el.locked } : el
      )
    }));
  }, []);

  const duplicateElement = useCallback((id: string) => {
    setState(prev => {
      const elementIndex = prev.elements.findIndex(el => el.id === id);
      if (elementIndex === -1) return prev;
      
      const element = prev.elements[elementIndex];
      const duplicated: EditorElement = {
        ...element,
        id: generateId(),
        name: `${element.name} (copy)`,
        position: {
          x: element.position.x + 20,
          y: element.position.y + 20
        }
      };
      
      const newElements = [...prev.elements];
      newElements.splice(elementIndex + 1, 0, duplicated);
      
      return { 
        ...prev, 
        elements: newElements,
        selectedElementId: duplicated.id
      };
    });
  }, []);

  const setZoom = useCallback((zoom: number) => {
    setState(prev => ({ ...prev, zoom: Math.max(10, Math.min(200, zoom)) }));
  }, []);

  const setBackground = useCallback((image: string | null, blur?: number, brightness?: number) => {
    setState(prev => ({
      ...prev,
      backgroundImage: image,
      backgroundBlur: blur ?? prev.backgroundBlur,
      backgroundBrightness: brightness ?? prev.backgroundBrightness
    }));
  }, []);

  const clearCanvas = useCallback(() => {
    setState({
      ...initialState,
      elements: []
    });
  }, []);

  const contextValue: EditorContext = {
    ...state,
    addElement,
    updateElement,
    removeElement,
    reorderElements,
    selectElement,
    toggleVisibility,
    toggleLock,
    duplicateElement,
    setZoom,
    setBackground,
    clearCanvas
  };

  return (
    <EditorContextInstance.Provider value={contextValue}>
      {children}
    </EditorContextInstance.Provider>
  );
}

export function useEditor(): EditorContext {
  const context = useContext(EditorContextInstance);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
}

export function useSelectedElement(): EditorElement | null {
  const { elements, selectedElementId } = useEditor();
  return elements.find(el => el.id === selectedElementId) || null;
}

export function useTextElement(): TextElement | null {
  const selected = useSelectedElement();
  if (selected?.type === 'text') {
    return selected as TextElement;
  }
  return null;
}
