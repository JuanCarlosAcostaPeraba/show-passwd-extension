# Contributing to Show Password Toggle

Thank you for your interest in contributing to Show Password Toggle! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git
- A modern browser with extension development support

### Development Setup

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/yourusername/show-passwd-extension.git
   cd show-passwd-extension
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development mode**

   ```bash
   npm run dev
   ```

4. **Load the extension in your browser**
   - Chrome: Go to `chrome://extensions/`, enable Developer mode, click "Load unpacked"
   - Firefox: Go to `about:debugging`, click "This Firefox", click "Load Temporary Add-on"

## 📝 How to Contribute

### Types of Contributions

- 🐛 **Bug fixes**: Fix issues and improve stability
- ✨ **New features**: Add functionality that enhances the extension
- 📚 **Documentation**: Improve docs, comments, and examples
- 🧪 **Tests**: Add or improve test coverage
- 🎨 **UI/UX**: Improve user experience and visual design
- 🔧 **Performance**: Optimize code and reduce resource usage

### Development Workflow

1. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the coding standards (see below)
   - Add tests for new functionality
   - Update documentation if needed

3. **Test your changes**

   ```bash
   npm run test
   npm run lint
   npm run build
   ```

4. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat: add amazing new feature"
   ```

5. **Push and create a Pull Request**

   ```bash
   git push origin feature/your-feature-name
   ```

## 📋 Coding Standards

### TypeScript Guidelines

- Use strict TypeScript mode
- Prefer explicit types over `any`
- Use interfaces for object shapes
- Follow the existing code style

### Code Style

- 2-space indentation
- Single quotes for strings
- Semicolons required
- Trailing commas in objects/arrays
- Use Prettier for formatting

### File Naming

- Use kebab-case for files: `show-password-button.ts`
- Use PascalCase for React components: `MyComponent.tsx`
- Use camelCase for functions and variables

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat: add new feature
fix: resolve bug
docs: update documentation
style: formatting changes
refactor: code restructuring
test: add or update tests
chore: maintenance tasks
```

## 🧪 Testing Guidelines

### Unit Tests

- Write tests for all new functions
- Test edge cases and error conditions
- Aim for high code coverage
- Use descriptive test names

### Manual Testing

- Test on multiple websites
- Verify cross-browser compatibility
- Check responsive behavior
- Test accessibility features

### Test Sites to Try

- Gmail, GitHub, Facebook, Twitter
- E-commerce sites (Amazon, eBay)
- Banking and financial sites
- Government and educational sites

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Browser and version**
2. **Extension version**
3. **Steps to reproduce**
4. **Expected vs actual behavior**
5. **Screenshots or videos**
6. **Console errors (if any)**

### Bug Report Template

```markdown
**Bug Description**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- Browser: [e.g. Chrome 120]
- OS: [e.g. Windows 11]
- Extension version: [e.g. 0.1.0]
```

## ✨ Feature Requests

When suggesting features:

1. **Check existing issues** first
2. **Describe the use case** clearly
3. **Explain the benefits** to users
4. **Consider implementation** complexity
5. **Provide examples** if possible

## 📚 Documentation

### Code Documentation

- Add JSDoc comments for public functions
- Explain complex algorithms
- Include usage examples
- Document configuration options

### README Updates

- Keep installation instructions current
- Update feature lists
- Add new screenshots
- Maintain changelog

## 🔍 Code Review Process

### For Contributors

- Ensure all tests pass
- Follow coding standards
- Write clear commit messages
- Respond to review feedback
- Keep PRs focused and small

### For Reviewers

- Be constructive and helpful
- Check code quality and style
- Verify tests and documentation
- Test the changes manually
- Approve or request changes clearly

## 🏗️ Architecture Guidelines

### Content Scripts

- Keep logic minimal and focused
- Use efficient DOM observation
- Avoid memory leaks
- Handle errors gracefully

### Background Scripts

- Minimize service worker usage
- Use event-driven patterns
- Avoid long-running operations
- Clean up resources properly

### Shared Libraries

- Keep functions pure when possible
- Use dependency injection
- Write comprehensive tests
- Document public APIs

## 🚀 Release Process

### Version Bumping

- **Patch** (0.1.1): Bug fixes
- **Minor** (0.2.0): New features
- **Major** (1.0.0): Breaking changes

### Release Checklist

- [ ] All tests pass
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] Version bumped
- [ ] Build successful
- [ ] Manual testing completed

## 💬 Communication

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and ideas
- **Pull Requests**: Code changes and reviews
- **Email**: [juancarlos.ap.dev@gmail.com] for private matters

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be:

- Listed in the README
- Mentioned in release notes
- Credited in the extension's about page
- Thanked in the changelog

---

Thank you for contributing to Show Password Toggle! 🎉
