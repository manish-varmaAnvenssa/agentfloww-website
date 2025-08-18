# Logo Usage Guide

## 📁 Logo Files

Your company logo is now set up in this directory:

### Current Logo:
- `logo.png` - Your main company logo (cropped-cropped-New_Color_Logo-removebg-preview.png)
- `cropped-cropped-New_Color_Logo-removebg-preview.png` - Original logo file

### Optional Files (for future use):
- `logo-white.png` - White version for dark backgrounds (if needed)
- `logo-dark.png` - Dark version for light backgrounds (if needed)
- `logo.svg` - Vector version (recommended for scaling)
- `favicon.ico` - Browser tab icon

## 🎯 Recommended Specifications:

### Main Logo (logo.png):
- **Format**: PNG with transparent background
- **Size**: 200x200px minimum (will scale down)
- **Aspect Ratio**: Square or rectangular
- **Background**: Transparent

### White Logo (logo-white.png):
- **Format**: PNG with transparent background
- **Size**: Same as main logo
- **Color**: White or light colors
- **Use**: Homepage with gradient background

### SVG Logo (logo.svg):
- **Format**: SVG vector format
- **Size**: Scalable (no fixed size)
- **Use**: Best for all screen sizes

## 🔧 How It Works:

The header automatically uses:
- `logo.png` on all pages (your colored logo with transparent background)
- Falls back to text logo if image fails to load
- Your logo has a transparent background, so it works well on both light and dark backgrounds

## 📝 Usage in Code:

```jsx
// The logo is automatically handled in Header.jsx
<img 
  src="/images/logo/logo.png" 
  alt="Anvenssa Logo" 
  className="h-12 w-auto"
/>
// Only the logo image is displayed, no text
```

## 🚀 Quick Setup:

1. Add your logo files to this directory
2. Name them exactly as shown above
3. The header will automatically use the appropriate version
4. Test on both homepage and other pages

## 💡 Tips:

- Use PNG for photos, SVG for graphics
- Keep file sizes under 100KB for fast loading
- Test on different screen sizes
- Ensure good contrast on both light and dark backgrounds 