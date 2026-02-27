const fs = require('fs');
const path = require('path');

const fontsDir = __dirname;
const metadata = {};

// Get all font directories
const fontNames = fs.readdirSync(fontsDir).filter(f => fs.statSync(path.join(fontsDir, f)).isDirectory());

fontNames.forEach(fontName => {
  const fontDir = path.join(fontsDir, fontName);
  const webDir = path.join(fontDir, 'WEB');
  const ttfDir = path.join(fontDir, 'TTF');
  const otfDir = path.join(fontDir, 'OTF');
  
  const webFiles = fs.existsSync(webDir) ? fs.readdirSync(webDir) : [];
  const ttfFiles = fs.existsSync(ttfDir) ? fs.readdirSync(ttfDir) : [];
  const otfFiles = fs.existsSync(otfDir) ? fs.readdirSync(otfDir) : [];
  
  // Extract weights from file names
  const weights = new Set();
  webFiles.forEach(file => {
    if (file.includes('.woff2') || file.includes('.woff')) {
      const parts = file.replace(/\.(eot|woff2|woff|ttf)$/i, '').split('-');
      if (parts.length > 1) {
        const weight = parts[1].replace(/Italic/i, '');
        if (weight) weights.add(weight);
      } else {
        weights.add('Regular');
      }
    }
  });
  
  metadata[fontName] = {
    name: fontName,
    web: {
      count: webFiles.length,
      formats: ['woff2', 'woff', 'eot', 'ttf'].filter(fmt => 
        webFiles.some(f => f.endsWith(fmt))
      )
    },
    ttf: {
      count: ttfFiles.length,
      files: ttfFiles
    },
    otf: {
      count: otfFiles.length,
      files: otfFiles
    },
    weights: Array.from(weights).sort(),
    path: `/fonts/${fontName}`
  };
});

fs.writeFileSync(path.join(fontsDir, 'fonts-metadata.json'), JSON.stringify(metadata, null, 2));
console.log('Generated fonts-metadata.json');
