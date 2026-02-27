export type ElementType = 'text' | 'image' | 'shape';

export interface Position {
  x: number;
  y: number;
}

export interface TextContent {
  text: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: number;
  isItalic: boolean;
  fill: string;
  stroke: string;
  strokeWidth: number;
  lineHeight: number;
  letterSpacing: number;
}

export interface ImageContent {
  src: string;
  objectFit: 'cover' | 'contain' | 'fill';
  flipX: boolean;
  flipY: boolean;
  maskGradient?: string;
}

export interface ShapeContent {
  shapeType: 'rectangle' | 'circle' | 'badge';
  fill: string;
  stroke: string;
  strokeWidth: number;
  rotation: number;
  text?: string;
}

export interface BaseElement {
  id: string;
  name: string;
  type: ElementType;
  position: Position;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  zIndex: number;
  visible: boolean;
  locked: boolean;
}

export interface TextElement extends BaseElement {
  type: 'text';
  content: TextContent;
}

export interface ImageElement extends BaseElement {
  type: 'image';
  content: ImageContent;
}

export interface ShapeElement extends BaseElement {
  type: 'shape';
  content: ShapeContent;
}

export type EditorElement = TextElement | ImageElement | ShapeElement;

export interface EditorState {
  elements: EditorElement[];
  selectedElementId: string | null;
  canvasWidth: number;
  canvasHeight: number;
  zoom: number;
  backgroundColor: string;
  backgroundImage: string | null;
  backgroundBlur: number;
  backgroundBrightness: number;
}

export interface EditorActions {
  addElement: (element: EditorElement) => void;
  updateElement: (id: string, updates: Partial<EditorElement>) => void;
  removeElement: (id: string) => void;
  reorderElements: (fromIndex: number, toIndex: number) => void;
  selectElement: (id: string | null) => void;
  toggleVisibility: (id: string) => void;
  toggleLock: (id: string) => void;
  duplicateElement: (id: string) => void;
  setZoom: (zoom: number) => void;
  setBackground: (image: string | null, blur?: number, brightness?: number) => void;
  clearCanvas: () => void;
}

export type EditorContext = EditorState & EditorActions;
