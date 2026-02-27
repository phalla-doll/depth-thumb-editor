'use client';

import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { 
  type EditorState, 
  type EditorActions, 
  type EditorContext, 
  type EditorElement,
  type TextElement,
  type ImageElement,
  type ToolType
} from './editor-types';

const generateId = (): string => {
  return `el-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const DEFAULT_CANVAS_WIDTH = 1280;
const DEFAULT_CANVAS_HEIGHT = 720;

const initialState: EditorState = {
  elements: [],
  selectedElementId: null,
  canvasWidth: DEFAULT_CANVAS_WIDTH,
  canvasHeight: DEFAULT_CANVAS_HEIGHT,
  zoom: 62,
  activeTool: 'select',
  backgroundColor: '#000000',
  backgroundImage: null,
  backgroundBlur: 0,
  backgroundBrightness: 1
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

  const setTool = useCallback((tool: ToolType) => {
    setState(prev => ({ ...prev, activeTool: tool }));
  }, []);

  const setCanvasSize = useCallback((width: number, height: number) => {
    setState(prev => ({ ...prev, canvasWidth: width, canvasHeight: height }));
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
    setTool,
    setCanvasSize,
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
