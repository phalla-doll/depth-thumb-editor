'use client';

import { toPng } from 'html-to-image';

interface ExportOptions {
  includeBackground: boolean;
  canvasWidth: number;
  canvasHeight: number;
  filename?: string;
  backgroundColor?: string;
}

export function generateFilename(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `depth-thumb-${year}${month}${day}-${hours}${minutes}${seconds}.png`;
}

export async function exportToPng(
  node: HTMLElement,
  options: ExportOptions
): Promise<void> {
  const { includeBackground, canvasWidth, canvasHeight, filename, backgroundColor } = options;
  const finalFilename = filename || generateFilename();

  let backgroundStyle = '';
  let backgroundImageElement: HTMLElement | null = null;

  if (!includeBackground) {
    backgroundStyle = node.style.background;
    node.style.background = 'transparent';

    backgroundImageElement = node.querySelector('[style*="backgroundImage"]') as HTMLElement;
    if (backgroundImageElement) {
      backgroundImageElement.style.display = 'none';
    }
  }

  try {
    await document.fonts.ready;

    const dataUrl = await toPng(node, {
      width: canvasWidth,
      height: canvasHeight,
      pixelRatio: 1,
      backgroundColor: includeBackground ? backgroundColor : undefined,
      quality: 1,
      filter: (domNode) => !domNode.getAttribute?.('data-export-exclude'),
    });

    const link = document.createElement('a');
    link.download = finalFilename;
    link.href = dataUrl;
    link.click();
  } finally {
    if (!includeBackground) {
      node.style.background = backgroundStyle;
      if (backgroundImageElement) {
        backgroundImageElement.style.display = '';
      }
    }
  }
}
