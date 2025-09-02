# Contributing to TimberJ 🌲

Thank you for your interest in contributing to TimberJ! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Testing](#testing)
- [Code Style](#code-style)
- [Pull Request Process](#pull-request-process)
- [Release Process](#release-process)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

- Use the GitHub issue tracker
- Include a clear and descriptive title
- Describe the exact steps to reproduce the bug
- Provide specific examples to demonstrate the steps
- Describe the behavior you observed after following the steps
- Explain which behavior you expected to see instead and why
- Include details about your environment

### Suggesting Enhancements

- Use the GitHub issue tracker
- Provide a clear and descriptive title
- Describe the suggested enhancement in detail
- Explain why this enhancement would be useful
- List any similar features and applications you know of

### Pull Requests

- Fork the repository
- Create a feature branch (`git checkout -b feature/amazing-feature`)
- Make your changes
- Add tests for new functionality
- Ensure all tests pass
- Update documentation if needed
- Commit your changes (`git commit -m 'Add amazing feature'`)
- Push to the branch (`git push origin feature/amazing-feature`)
- Open a Pull Request

## Development Setup

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

1. Fork and clone the repository:
   ```bash
   git clone https://github.com/yourusername/timberj.git
   cd timberj
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Tests should be written in Jest
- Test files should be named `*.test.ts` or `*.spec.ts`
- Place test files in the `tests/` directory
- Follow the existing test structure and patterns
- Aim for high test coverage

### Test Structure

```typescript
describe("Feature", () => {
  beforeEach(() => {
    // Setup code
  });

  afterEach(() => {
    // Cleanup code
  });

  it("should do something specific", () => {
    // Test implementation
  });
});
```

## Code Style

### TypeScript

- Use TypeScript strict mode
- Prefer `const` over `let`
- Use explicit types when beneficial
- Follow ESLint rules

### Formatting

- Use 2 spaces for indentation
- Use double quotes for strings
- Use semicolons at the end of statements
- Use trailing commas in objects and arrays

### Naming Conventions

- Use camelCase for variables and functions
- Use PascalCase for classes and interfaces
- Use UPPER_SNAKE_CASE for constants
- Use descriptive names that explain intent

## Pull Request Process

1. **Update Documentation**: Update README.md, CHANGELOG.md, and other relevant documentation
2. **Add Tests**: Ensure new functionality has appropriate test coverage
3. **Update Examples**: Add or update examples if new features are added
4. **Check CI**: Ensure all CI checks pass
5. **Request Review**: Request review from maintainers

### PR Checklist

- [ ] Code follows the project's style guidelines
- [ ] Tests pass locally and in CI
- [ ] Documentation has been updated
- [ ] Examples have been updated (if applicable)
- [ ] CHANGELOG.md has been updated
- [ ] All CI checks pass

## Release Process

### Versioning

We use [Semantic Versioning](https://semver.org/):

- **MAJOR**: Incompatible API changes
- **MINOR**: New functionality in a backward-compatible manner
- **PATCH**: Backward-compatible bug fixes

### Release Steps

1. Update version in `package.json`
2. Update `CHANGELOG.md` with release notes
3. Create a release tag
4. Publish to npm
5. Create GitHub release

## Getting Help

If you need help with contributing:

- Check existing issues and pull requests
- Ask questions in GitHub discussions
- Contact maintainers directly

## Recognition

Contributors will be recognized in:

- `README.md` contributors section
- `CHANGELOG.md` for significant contributions
- GitHub contributors page

Thank you for contributing to TimberJ! 🌲✨
