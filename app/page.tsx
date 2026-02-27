'use client';

import React, { useState, useEffect } from 'react';
import { EditorProvider } from '../lib/editor-context';
import { Header } from '../components/Header';
import { LeftSidebar } from '../components/LeftSidebar';
import { RightSidebar } from '../components/RightSidebar';
import { CanvasArea } from '../components/CanvasArea';
import { getFontsList, getDefaultFont, getWeightNumbers, type FontMetadata } from '../lib/font-utils';
import { useDynamicFontStyles } from '../hooks/useDynamicFontStyles';

export default function DepthThumbEditor() {
  const fonts = getFontsList();
  const defaultFont = getDefaultFont();
  const defaultWeights = getWeightNumbers(defaultFont);
  
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
    <EditorProvider>
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
    </EditorProvider>
  );
}
