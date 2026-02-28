# DepthThumb Editor

A modern, feature-rich thumbnail editor with advanced 3D depth effects and visual styling capabilities. Built with Next.js 15, React 19, and Tailwind CSS. Features a PWA (Progressive Web App) for mobile support and seamless offline access.

![DepthThumb Editor](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

## Features

### Canvas & Editing
- **Full-featured Canvas**: 1280x720 editing workspace with zoom controls
- **Layer Management**: Organize assets with a layer panel (Assets/Layers tabs)
- **Safe Zones & Guides**: Toggle grid overlays for precise positioning
- **Preview Mode**: Real-time preview of your thumbnails
- **Hand & Selection Tools**: Navigate and select elements with ease
- **Drag & Drop**: Intuitive element positioning on the canvas

### Text Tools
- **150+ Fonts**: Integration with Fontshare API for diverse typography, plus built-in Satoshi family
- **Font Controls**: Select font family, weight (100-900), and size
- **Color & Stroke**: Fill and stroke color customization
- **Dynamic Preview**: Real-time text rendering as you edit
- **Multi-line Support**: Add and format multiple text lines

### 3D & Depth Effects
- **Extrusion Depth**: Add 3D depth to text (0-100px)
- **Shadow Distance**: Control shadow offset (0-50px)
- **Z-Rotation**: 3D rotation along the Z-axis (-45° to +45°)
- **Toggle Control**: Enable/disable 3D effects with one click
- **Real-time Preview**: See effects instantly as you adjust

### Visual Effects
- **Neon Glow**: Add vibrant glow effects with intensity control (Soft/Hard modes)
- **Smart Blur**: Adjustable blur intensity (0-20px)
- **Background Blur**: Enhanced background depth effects
- **Shadow Effects**: Multiple shadow styles for depth

### Templates & Assets
- **Pre-built Templates**: Gaming, Vlog, Tech, and Podcast templates
- **Asset Upload**: Upload custom images and assets
- **Shape Library**: Add geometric shapes to your designs
- **Image Optimization**: Automatic image optimization and formatting

### Export & Preview
- **Canvas Export**: Download thumbnails in full resolution
- **Multiple Formats**: Support for PNG, JPEG, WebP
- **Background Options**: Export with or without background
- **Quality Control**: Preview before export to ensure quality
- **Filename Generation**: Auto-generates descriptive filenames

### PWA & Mobile
- **Installable App**: Install on desktop and mobile devices
- **Offline Support**: PWA-ready for offline access
- **Mobile-First Design**: Responsive interface optimized for touch devices
- **App Manifest**: Customizable app icon and branding
- **App Icons**: Multiple icon sizes for all devices

## Screenshots

### Main Interface
![Main Interface](./screenshots/main-interface.png)
*Full editor interface with canvas, layer panel, and properties sidebar*

### 3D & Depth Panel
![3D Effects Panel](./screenshots/3d-effects.png)
*Advanced 3D depth and rotation controls*

### Export Options
![Export Dialog](./screenshots/export.png)
*Export functionality with format and quality options*

## Tech Stack

- **Framework**: Next.js 15.4.9
- **UI Library**: React 19.2.1
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 4.1
- **Icons**: Lucide React 0.553.0
- **Animations**: Motion 12.23.24
- **Fonts**: Google Fonts (Space Grotesk), Fontshare API, Satoshi (local)
- **AI Integration**: Google GenAI SDK 1.17.0 (optional)
- **PWA**: Progressive Web App support
- **Canvas API**: High-performance 2D rendering

## Prerequisites

- **Node.js**: 18.x or higher
- **npm**: Latest version
- **Git**: For version control
- **Gemini API Key**: Required ONLY for AI-powered content generation (optional for basic use)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/depth-thumb-editor.git
cd depth-thumb-editor
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:

```env
GEMINI_API_KEY="your_gemini_api_key_here"
APP_URL="http://localhost:3000"
```

**Get a Gemini API Key:**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy it to your `.env.local` file

> **Note**: The Gemini API key is only required if you want to use the AI-powered content generation features. The editor works perfectly without it for all basic functionality.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Install as PWA (Optional)

#### On Desktop (Chrome/Edge):
1. Open the app in your browser
2. Click the browser's "Install App" button
3. Follow the installation prompts

#### On Mobile:
1. Open the app in your browser
2. Tap the "Add to Home Screen" option in your browser menu
3. Confirm the installation

The app will then launch as a standalone application with its own icon.

## Usage Guide

### Interface Overview

The editor consists of three main sections:

1. **Left Sidebar**: Assets, layers, and templates
2. **Center Canvas**: Main editing workspace
3. **Right Sidebar**: Text properties and effects

### Adding Text

1. Click the **Text** button in the Assets panel
2. Select the text element on the canvas
3. Customize in the Text Properties panel:
   - Choose font family from 150+ options (Satoshi + Fontshare API)
   - Adjust weight (100-900)
   - Set font size
   - Change fill and stroke colors
4. Type your text content
5. Drag the text to position it on the canvas

### Adding Shapes and Images

1. **Shapes**: Click a shape from the Shapes section
2. **Images**: Click the Upload button and select an image file
3. Drag shapes/images onto the canvas
4. Use the layer panel to reorder elements

### Applying 3D Effects

1. Select a text element
2. In the right sidebar, toggle **3D & Depth** on
3. Adjust the following:
   - **Extrusion Depth**: Controls 3D thickness
   - **Shadow Distance**: Shadow offset amount
   - **Z-Rotation**: 3D rotation angle
   - **Shadow Settings**: Toggle shadows on/off
   - **Background Effects**: Background blur intensity

### Using Safe Zones & Guides

1. Click the **Grid** button in the top toolbar
2. Enable or disable the following guides:
   - **Safe Zones**: Standard YouTube safe area (13.5% margins)
   - **Center Guide**: Visual center marker
   - **Grid Lines**: Fine grid for precision
3. The guides appear as translucent overlays on the canvas

### Previewing Your Design

1. Click the **Preview** button in the top toolbar
2. The editor hides UI elements and shows only the canvas
3. Click **Close** to return to edit mode

### Exporting Thumbnails

1. Click the **Export** button in the top right
2. Select format (PNG/JPEG/WebP)
3. Toggle **Include Background** if needed
4. Choose quality settings (highly recommended for YouTube)
5. Click download to save

### Using Templates

1. Browse templates in the Templates section (Gaming, Vlog, Tech, Podcast)
2. Click on a template to load it
3. Customize layers and text as needed
4. Export your customized design

### Drag & Drop Operations

- **Reorder Layers**: Drag elements in the layer panel to reorder them
- **Position Elements**: Drag text, shapes, or images directly on the canvas
- **Resize Elements**: Drag handles on selected elements to resize
- **Move Elements**: Click to select, then drag to move

## Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | No | Google Gemini API key for AI features (optional) |
| `APP_URL` | No | Base URL for the application (defaults to localhost:3000) |

### PWA Configuration

The PWA manifest is configured in `app/manifest.ts`:

```typescript
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DepthThumb Editor',
    short_name: 'DepthThumb',
    description: 'DepthThumb Editor Dashboard',
    start_url: '/',
    display: 'standalone',
    background_color: '#09090b',
    theme_color: '#f97316',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}
```

To customize the app:

1. Edit `app/manifest.ts` to change app name, colors, or icons
2. Replace `/icon.svg` with your own app icon
3. The app will automatically use the new manifest after deployment

### Theme Customization

Modify colors in `app/globals.css`:

```css
@theme {
  --color-primary: #f97316;    /* Orange */
  --color-secondary: #db2777;  /* Pink */
  --color-background-dark: #09090b;
  --color-surface-dark: #18181b;
  --color-surface-lighter: #27272a;
}
```

### Font Configuration

The editor includes:
- **Satoshi** (local): Premium font family with multiple weights
- **Fontshare API**: 150+ additional fonts (online)

To add custom fonts:

1. Edit `app/layout.tsx` to add new font imports
2. Update font family options in the text properties panel
3. Update `globals.css` with font variables if needed

## Deployment

### Deploy to Vercel

1. **Push to GitHub**

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

2. **Import to Vercel**

- Go to [vercel.com](https://vercel.com)
- Click "Add New Project"
- Import your GitHub repository

3. **Configure Environment Variables**

In Vercel dashboard, add:

```
GEMINI_API_KEY=your_production_api_key
APP_URL=https://your-app.vercel.app
```

> **Note**: Set `GEMINI_API_KEY` to your production API key if using AI features

4. **Deploy**

Click "Deploy". Vercel will build and deploy automatically.

5. **Install as PWA**

After deployment, users can install the app from the Vercel domain.

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t depth-thumb-editor .
docker run -p 3000:3000 depth-thumb-editor
```

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting

# Select your project
# Set public directory to 'out'
# Configure as single-page app

npm run build
firebase deploy
```

### Nginx Deployment

Create an `nginx.conf`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/depth-thumb-editor/out;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /icon.svg {
        alias /var/www/depth-thumb-editor/app/icon.svg;
    }

    location /manifest.json {
        alias /var/www/depth-thumb-editor/app/manifest.json;
    }
}
```

Build and deploy:

```bash
npm run build
# Copy 'out' directory to nginx root
# Configure nginx with the above config
```

## Development

### Project Structure

```
depth-thumb-editor/
├── app/
│   ├── icon.svg                        # PWA app icon
│   ├── manifest.ts                     # PWA manifest configuration
│   ├── layout.tsx                      # Root layout with fonts
│   ├── page.tsx                        # Main editor component
│   └── globals.css                     # Global styles and theme
├── components/
│   ├── CanvasArea.tsx                  # Main canvas component
│   ├── CanvasElement.tsx               # Individual canvas elements
│   ├── ExportModal.tsx                 # Export dialog
│   ├── PreviewModal.tsx                # Preview mode
│   ├── Header.tsx                      # Application header
│   ├── LeftSidebar.tsx                 # Left sidebar (assets, templates)
│   ├── PreviewModal.tsx                # Preview functionality
│   ├── RightSidebar.tsx                # Right sidebar (properties)
│   ├── SafeZonesOverlay.tsx            # Grid and safe zone overlays
│   └── properties/
│       ├── DepthEffects.tsx            # 3D depth controls
│       ├── ImageProperties.tsx         # Image controls
│       ├── ShapeProperties.tsx         # Shape controls
│       └── TextProperties.tsx          # Text controls
├── hooks/
│   └── use-mobile.ts                   # Mobile responsive hook
├── lib/
│   ├── editor-context.tsx              # Editor state management
│   ├── editor-types.ts                 # TypeScript type definitions
│   ├── export-utils.ts                 # Export utilities
│   ├── font-utils.ts                   # Font management utilities
│   └── utils.ts                        # Utility functions
├── public/fonts/                       # Local font files (Satoshi)
├── .env.example                        # Environment variables template
├── next.config.ts                      # Next.js configuration
├── tailwind.config.ts                  # Tailwind CSS configuration
├── tsconfig.json                       # TypeScript configuration
└── package.json                        # Dependencies and scripts
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run clean    # Clean Next.js cache
```

### Component Architecture

The editor is built with a modular component architecture:

1. **Canvas Area** (`CanvasArea.tsx`): Main rendering area with zoom and pan
2. **Canvas Elements** (`CanvasElement.tsx`): Individual interactive elements
3. **Sidebar Components**: Left and right sidebars for different controls
4. **Property Panels**: Specialized property controls for each element type
5. **Overlay Components**: Safe zones, guides, and previews
6. **Modals**: Export and preview dialogs

### Adding New Features

1. **New Effect**: Add controls in the appropriate property panel (`components/properties/`)
2. **New Template**: Add to templates array in `components/LeftSidebar.tsx`
3. **New API Integration**: Add to `useEffect` hooks in `app/page.tsx` or create new hooks in `hooks/`
4. **New Component**: Create in `components/` directory
5. **New Type**: Add to `lib/editor-types.ts`
6. **New Utility**: Add to `lib/utils.ts`

### Code Style

- Use TypeScript for type safety
- Follow React functional component patterns
- Use Tailwind CSS for styling
- Keep components modular and reusable
- Write descriptive variable names
- Use `cn()` utility for className combinations
- Always handle errors with try-catch blocks

## Troubleshooting

### Fonts Not Loading

- Check internet connection (Fontshare API requires network)
- Verify API response in browser console
- Clear browser cache and reload
- Ensure `node_modules/public/fonts` contains font files

### Build Errors

```bash
npm run clean
rm -rf node_modules package-lock.json
npm install
```

### PWA Issues

- Clear browser cache and reinstall
- Check manifest.ts for correct paths
- Ensure icon.svg exists in app/ directory
- Verify HTTPS is used in production (required for PWA)

### Export Not Working

- Check browser console for errors
- Ensure canvas element exists
- Verify file permissions for downloads
- Check file naming conflicts

### API Key Issues

- Verify `GEMINI_API_KEY` is set in `.env.local` or production environment
- Check API key validity in Google AI Studio
- Ensure API key has required permissions
- Verify AI features are not required for basic functionality

### Canvas Not Responding

- Check browser console for errors
- Verify zoom level is not too extreme
- Ensure no elements are blocking canvas interaction
- Check for JavaScript errors in the console

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Workflow

1. Create a feature branch from main
2. Make your changes following code style guidelines
3. Test manually in development mode
4. Run `npm run lint` to check for errors
5. Test in production build if possible
6. Commit with clear, descriptive messages
7. Open PR with explanation of changes

## Performance Tips

- Use preview mode when possible to save rendering time
- Limit the number of layers for better performance
- Use built-in fonts (Satoshi) when offline support is needed
- Compress large images before uploading
- Clear browser cache regularly
- Use hardware acceleration in browser settings

## Security Considerations

- Never commit `.env.local` or API keys to version control
- Validate all user inputs on the server side
- Sanitize content before rendering
- Use HTTPS in production
- Implement rate limiting for API calls
- Keep dependencies updated for security patches

## Browser Compatibility

- Chrome/Edge: Fully supported
- Firefox: Supported (limited PWA features)
- Safari: Supported (limited PWA features)
- Mobile Browsers: PWA supported on most modern browsers

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Fontshare](https://fontshare.com) for providing 150+ free fonts
- [Satoshi](https://satoshi.sh) for the built-in font family
- [Lucide](https://lucide.dev) for beautiful icons
- [Next.js](https://nextjs.org) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com) for utility-first styling
- [Vercel](https://vercel.com) for hosting and deployment solutions

## Support

For issues, questions, or feature requests, please open an issue on [GitHub](https://github.com/your-username/depth-thumb-editor/issues).

### Getting Help

1. Check the [Troubleshooting](#troubleshooting) section
2. Search existing issues on GitHub
3. Read the [Documentation](#usage-guide)
4. Open a new issue with detailed information

### Community

- Join discussions on GitHub Discussions
- Report bugs on GitHub Issues
- Request features via GitHub Issues

## Roadmap

### Planned Features

- [ ] Image filters (grayscale, sepia, etc.)
- [ ] Background patterns and textures
- [ ] Multiple canvas layouts
- [ ] Component library export
- [ ] Cloud storage integration
- [ ] Collaborative editing
- [ ] Advanced AI suggestions
- [ ] Template marketplace
- [ ] Dark/Light mode toggle
- [ ] Keyboard shortcuts
- [ ] Undo/Redo history

---

Made with ❤️ using Next.js, React, and Tailwind CSS
