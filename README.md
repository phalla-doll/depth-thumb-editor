# DepthThumb Editor

A modern, feature-rich thumbnail editor with advanced 3D depth effects and visual styling capabilities. Built with Next.js 15, React 19, and Tailwind CSS.

![DepthThumb Editor](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

## Features

### Canvas & Editing
- **Full-featured Canvas**: 1280x720 editing workspace with zoom controls
- **Layer Management**: Organize assets with a layer panel (Assets/Layers tabs)
- **Safe Zones & Guides**: Toggle grid overlays for precise positioning
- **Preview Mode**: Real-time preview of your thumbnails
- **Hand & Selection Tools**: Navigate and select elements with ease

### Text Tools
- **150+ Fonts**: Integration with Fontshare API for diverse typography
- **Font Controls**: Select font family, weight (100-900), and size
- **Color & Stroke**: Fill and stroke color customization
- **Dynamic Preview**: Real-time text rendering as you edit

### 3D & Depth Effects
- **Extrusion Depth**: Add 3D depth to text (0-100px)
- **Shadow Distance**: Control shadow offset (0-50px)
- **Z-Rotation**: 3D rotation along the Z-axis (-45° to +45°)
- **Toggle Control**: Enable/disable 3D effects with one click

### Visual Effects
- **Neon Glow**: Add vibrant glow effects with intensity control (Soft/Hard modes)
- **Smart Blur**: Adjustable blur intensity (0-20px)
- **Background Blur**: Enhanced background depth effects

### Templates & Assets
- **Pre-built Templates**: Gaming, Vlog, Tech, and Podcast templates
- **Asset Upload**: Upload custom images and assets
- **AI Generation**: AI-powered content generation (placeholder)
- **Shape Library**: Add geometric shapes to your designs

### Export
- **High-Quality Export**: Download thumbnails in full resolution
- **Multiple Formats**: Support for PNG, JPEG, WebP
- **Preview Before Export**: Ensure quality before downloading

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
- **Fonts**: Google Fonts (Space Grotesk), Fontshare API
- **AI Integration**: Google GenAI SDK 1.17.0

## Prerequisites

- **Node.js**: 18.x or higher
- **npm**: Latest version
- **Git**: For version control
- **Gemini API Key**: Required for AI features

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

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

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
   - Choose font family from 150+ options
   - Adjust weight (100-900)
   - Set font size
   - Change fill and stroke colors

### Applying 3D Effects

1. Select a text element
2. In the right sidebar, toggle **3D & Depth** on
3. Adjust the following:
   - **Extrusion Depth**: Controls 3D thickness
   - **Shadow Distance**: Shadow offset amount
   - **Z-Rotation**: 3D rotation angle

### Using Templates

1. Browse templates in the Templates section
2. Click on a template (Gaming, Vlog, Tech, Podcast)
3. Customize layers and text as needed

### Uploading Assets

1. Click the **Upload** button in the Assets panel
2. Select your image file
3. The asset appears in the layer panel

### Exporting Thumbnails

1. Click the **Export** button in the top right
2. Select format (PNG/JPEG/WebP)
3. Choose quality settings
4. Click download to save

## Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Google Gemini API key for AI features |
| `APP_URL` | Yes | Base URL for the application |

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

Default font is **Space Grotesk** from Google Fonts. Additional fonts are loaded dynamically from Fontshare API. To add custom fonts:

1. Edit `app/layout.tsx`
2. Add new font imports from `next/font/google`
3. Update `globals.css` with font variables

## Deployment

### Deploy to Vercel

1. **Push to GitHub**

```bash
git add .
git commit -m "Initial commit"
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

4. **Deploy**

Click "Deploy". Vercel will build and deploy automatically.

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

## Development

### Project Structure

```
depth-thumb-editor/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Main editor component
│   └── globals.css         # Global styles and theme
├── hooks/
│   └── use-mobile.ts       # Mobile responsive hook
├── lib/
│   └── utils.ts            # Utility functions
├── .env.example            # Environment variables template
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run clean    # Clean Next.js cache
```

### Adding New Features

1. **New Effect**: Add controls in `RightSidebar` component
2. **New Template**: Add to templates array in `LeftSidebar`
3. **New API Integration**: Add to `useEffect` hooks in `page.tsx`
4. **New Component**: Create in `app/components/` directory

### Code Style

- Use TypeScript for type safety
- Follow React functional component patterns
- Use Tailwind CSS for styling
- Keep components modular and reusable
- Write descriptive variable names

## Troubleshooting

### Fonts Not Loading

- Check internet connection (Fontshare API requires network)
- Verify API response in browser console
- Clear browser cache and reload

### Build Errors

```bash
npm run clean
rm -rf node_modules package-lock.json
npm install
```

### API Key Issues

- Verify `GEMINI_API_KEY` is set in `.env.local`
- Check API key validity in Google AI Studio
- Ensure API key has required permissions

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Fontshare](https://fontshare.com) for providing 150+ free fonts
- [Lucide](https://lucide.dev) for beautiful icons
- [Next.js](https://nextjs.org) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com) for utility-first styling

## Support

For issues, questions, or feature requests, please open an issue on [GitHub](https://github.com/your-username/depth-thumb-editor/issues).

---

Made with ❤️ using Next.js and Tailwind CSS
