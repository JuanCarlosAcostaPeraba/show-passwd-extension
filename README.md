# Show Password Toggle

A browser extension that automatically adds eye icons to password fields that don't have native show/hide toggles. Works on any website with intelligent contrast detection and seamless integration.

![Extension Demo](https://via.placeholder.com/800x400/4A90E2/FFFFFF?text=Show+Password+Toggle+Demo)

## ✨ Features

- **🔍 Smart Detection**: Only adds toggles to password fields that lack native show/hide functionality
- **🎨 Auto Contrast**: Automatically adjusts icon color based on background for perfect visibility
- **📱 Responsive Design**: Works seamlessly across all websites and input styles
- **⚡ Lightweight**: Minimal performance impact with efficient DOM observation
- **🔒 Privacy First**: No data collection, works entirely client-side
- **🌍 Universal**: Compatible with Chrome, Edge, Firefox, and other Chromium-based browsers

## 🚀 Installation

### From Chrome Web Store

*Coming soon - extension is currently in development*

### Manual Installation (Development)

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/show-passwd-extension.git
   cd show-passwd-extension
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Build the extension**

   ```bash
   npm run build
   ```

4. **Load in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist/` folder

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or yarn
- Modern browser with extension support

### Available Scripts

```bash
# Development with hot reload
npm run dev

# Production build
npm run build

# Run tests
npm run test

# Lint code
npm run lint

# Copy static assets
npm run copy:static
```

### Project Structure

```
src/
├── content/          # Content script logic
├── background/        # Service worker
├── ui/               # Popup/options UI
├── lib/              # Shared utilities
│   ├── detection.ts  # Native toggle detection
│   └── dom.ts        # DOM manipulation
└── styles/          # CSS styles

extension/           # Extension metadata
├── manifest.json    # Extension configuration
└── content.css      # Content styles

tests/              # Test suites
├── unit/           # Unit tests
└── e2e/           # End-to-end tests
```

## 🎯 How It Works

### Smart Detection Algorithm

The extension uses a sophisticated detection system to avoid conflicts:

1. **Native Toggle Detection**: Scans for existing show/hide controls
2. **Pattern Matching**: Looks for common toggle patterns (eye icons, buttons)
3. **Form Context**: Analyzes surrounding form elements
4. **Dynamic Observation**: Monitors DOM changes for new password fields

### Auto Contrast System

- **Background Analysis**: Detects the background color of input fields
- **Luminance Calculation**: Uses WCAG standards for contrast calculation
- **Dynamic Adjustment**: Automatically switches between light/dark icons
- **Fallback Handling**: Graceful degradation for edge cases

## 🔧 Configuration

The extension works out-of-the-box with no configuration required. All settings are automatically optimized based on the website's design.

### Advanced Options

For developers who want to customize behavior, you can modify:

- **Detection patterns** in `src/lib/detection.ts`
- **Icon styling** in `extension/content.css`
- **Contrast thresholds** in `src/lib/dom.ts`

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### Manual Testing

1. Visit various websites with password fields
2. Test on different background colors
3. Verify no conflicts with native toggles
4. Check responsive behavior

### Test Sites

- Gmail login
- GitHub authentication
- Social media platforms
- E-commerce checkout forms

## 📦 Building for Production

```bash
# Create production build
npm run build

# The dist/ folder contains the extension ready for:
# - Chrome Web Store submission
# - Manual installation
# - Distribution
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm run test`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style

- TypeScript with strict mode
- ESLint + Prettier for formatting
- Conventional Commits for changelog
- 2-space indentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Material Design Icons for the eye icons
- WCAG guidelines for accessibility standards
- Chrome Extensions documentation
- The open-source community

## 📞 Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/yourusername/show-passwd-extension/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/yourusername/show-passwd-extension/discussions)
- 📧 **Contact**: [Your Email](mailto:your.email@example.com)

## 🔄 Changelog

### v0.1.0 (Current)

- Initial release
- Smart detection system
- Auto contrast adjustment
- Cross-browser compatibility
- Responsive design

---

**Made with ❤️ for better web accessibility**
