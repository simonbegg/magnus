# Magnus WordPress Theme

A modern WordPress starter theme built with Timber, TailwindCSS, and advanced image optimization.

## Features

- 🌲 **Timber/Twig Templates** - Clean separation of PHP logic and presentation
- 🎨 **TailwindCSS 4.x** - Utility-first CSS framework with built-in autoprefixer
- 📦 **Modern Asset Pipeline**
  - PostCSS for CSS processing
  - esbuild for JavaScript bundling
  - Automatic image optimization with WebP conversion
  - Live reload during development
- 🖼️ **Advanced Image Handling**
  - Automatic image optimization
  - WebP conversion with fallbacks
  - Nested folder structure support
  - SVG support

## Requirements

- PHP 7.4+
- WordPress 5.0+
- Node.js 16+
- Composer

## Installation

1. Clone this repository into your WordPress themes directory:
   ```bash
   cd wp-content/themes
   git clone https://github.com/simonbegg/magnus.git magnus
   ```

2. Install PHP dependencies:
   ```bash
   cd magnus
   composer install
   ```

3. Install Node.js dependencies:
   ```bash
   npm install
   ```

4. Build assets for production:
   ```bash
   npm run build
   ```

5. Activate the theme in WordPress admin panel

## Development

Start the development server with:
```bash
npm run dev
```

This will:
- Watch and compile CSS changes
- Watch and bundle JavaScript
- Optimize new/changed images
- Start BrowserSync for live reloading

### Directory Structure

```
magnus/
├── dist/                  # Compiled assets
│   ├── css/
│   ├── js/
│   └── images/
├── inc/                   # PHP includes
├── scripts/              # Build scripts
├── src/                  # Source files
│   ├── css/
│   ├── js/
│   └── images/
└── templates/            # Twig templates
```

### Asset Management

- **CSS**: Add your styles to `src/css/style.css`
- **JavaScript**: Add your scripts to `src/js/main.js`
- **Images**: Place images in `src/images/` (supports nested folders)

### Image Optimization

The theme includes automatic image optimization:
- Supports JPG, PNG, and SVG files
- Creates WebP versions of JPG/PNG files
- Maintains folder structure
- Optimizes on build and during development

### Available Commands

- `npm run dev` - Start development server with live reload
- `npm run build` - Build assets for production
- `npm run dev:css` - Watch and compile CSS only
- `npm run dev:js` - Watch and bundle JS only
- `npm run dev:images` - Watch and optimize images only

## Customization

### Fonts

The theme uses Google Fonts by default:
- Headings: Urbanist
- Body: Work Sans

To change fonts, update:
1. The font imports in `inc/enqueue.php`
2. The font families in `src/css/style.css`

### Templates

Timber templates are located in the `templates/` directory:
- `templates/base.twig` - Base template
- `templates/front-page.twig` - Homepage template
- Add new templates as needed

## Production

Build optimized assets for production:
```bash
npm run build
```

This will:
- Minify CSS and JavaScript
- Optimize all images
- Generate WebP versions
- Create sourcemaps

## Contributing

[Add contributing guidelines if applicable]

## License

[Add license information]
