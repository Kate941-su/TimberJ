# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive test suite with Jest
- ESLint configuration for code quality
- GitHub Actions CI/CD workflow
- Environment-based configuration examples
- Service pattern examples
- Testing examples and patterns

### Changed
- Updated dependencies to latest versions
- Improved TypeScript configuration
- Enhanced documentation with more examples

## [1.0.0] - 2025-09-02

### Added
- Initial release of TimberJ logging library
- 6 configurable log levels (DEBUG, LOG, INFO, WARN, ERROR, NOT_PLANTED)
- Tag-based logging organization
- Plant & Grow pattern for initialization
- Builder pattern API
- Full TypeScript support
- Zero external dependencies
- Comprehensive examples and documentation

### Features
- `TimberJ.plant(level)` - Initialize logging level
- `TimberJ.tag(tag)` - Create tagged logger
- `.d()`, `.l()`, `.i()`, `.w()`, `.e()` - Log level methods
- Automatic level filtering based on configuration
- Warning system for unplanted usage

---

## Version History

- **1.0.0** - Initial release with core logging functionality
- **Unreleased** - Enhanced testing, CI/CD, and documentation

## Migration Guide

### From Unreleased to 1.0.0
- No breaking changes
- All existing APIs remain the same
- Enhanced testing and development tooling

---

For more information about changes, see the [README.md](README.md) file.
