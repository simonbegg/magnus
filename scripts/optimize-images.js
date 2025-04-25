import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import sharp from 'sharp';
import chokidar from 'chokidar';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, '..', 'src', 'images');
const DIST_DIR = path.join(__dirname, '..', 'dist', 'images');
const QUALITY = 80;

console.log('Source directory:', SRC_DIR);
console.log('Destination directory:', DIST_DIR);

// Ensure dist directory exists
async function ensureDistDirectory() {
  try {
    await fs.access(DIST_DIR);
  } catch {
    console.log('Created dist directory');
    await fs.mkdir(DIST_DIR, { recursive: true });
  }
}

async function processImage(filePath) {
  try {
    const relativePath = path.relative(SRC_DIR, filePath);
    const outputDir = path.join(DIST_DIR, path.dirname(relativePath));
    const fileName = path.basename(filePath);
    const fileExt = path.extname(filePath).toLowerCase();

    console.log(`Processing file: ${filePath}`);
    console.log(`Output directory: ${outputDir}`);

    // Create output directory if it doesn't exist
    try {
      await fs.access(outputDir);
    } catch {
      console.log(`Created output directory: ${outputDir}`);
      await fs.mkdir(outputDir, { recursive: true });
    }

    // Handle SVG files separately (just copy them)
    if (fileExt === '.svg') {
      await fs.copyFile(filePath, path.join(outputDir, fileName));
      console.log(`Copied SVG file: ${fileName}`);
      return;
    }

    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Process JPG and PNG files
    if (['.jpg', '.jpeg', '.png'].includes(fileExt)) {
      // Optimize the original format
      await image
        .jpeg({ quality: QUALITY })
        .toFile(path.join(outputDir, fileName));

      // Create WebP version
      const webpName = `${path.parse(fileName).name}.webp`;
      await image
        .webp({ quality: QUALITY })
        .toFile(path.join(outputDir, webpName));

      console.log(`Processed: ${fileName}`);
      console.log(`Created WebP: ${webpName}`);
    } else if (fileExt === '.webp') {
      await image
        .webp({ quality: QUALITY })
        .toFile(path.join(outputDir, fileName));
      console.log(`Processed: ${fileName}`);
    } else {
      console.log(`Unsupported file type: ${fileExt}`);
      return;
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

async function findImages(directory) {
  const files = [];
  
  async function scan(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await scan(fullPath);
      } else if (['.jpg', '.jpeg', '.png', '.webp', '.svg'].includes(path.extname(entry.name).toLowerCase())) {
        files.push(fullPath);
      }
    }
  }
  
  await scan(directory);
  return files;
}

async function processAllImages() {
  try {
    console.log('Looking for images in:', SRC_DIR);
    const files = await findImages(SRC_DIR);
    console.log('Found files:', files);
    
    for (const file of files) {
      await processImage(file);
    }
    
    console.log('Image optimization complete!');
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

// Check if --watch flag is present
const watchMode = process.argv.includes('--watch');

if (watchMode) {
  console.log('Watching for image changes...');
  const watcher = chokidar.watch(SRC_DIR, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true
  });

  watcher
    .on('add', processImage)
    .on('change', processImage)
    .on('unlink', async (filePath) => {
      const relativePath = path.relative(SRC_DIR, filePath);
      const distPath = path.join(DIST_DIR, relativePath);
      try {
        await fs.unlink(distPath);
        console.log(`Removed: ${distPath}`);
        
        // Also remove WebP version if it exists
        if (!['.svg', '.webp'].includes(path.extname(filePath))) {
          const webpPath = path.join(
            path.dirname(distPath),
            `${path.parse(filePath).name}.webp`
          );
          await fs.unlink(webpPath);
          console.log(`Removed WebP: ${webpPath}`);
        }
      } catch (error) {
        if (error.code !== 'ENOENT') {
          console.error(`Error removing ${distPath}:`, error);
        }
      }
    });
} else {
  await ensureDistDirectory();
  processAllImages();
}
