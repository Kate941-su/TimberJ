# TimberJ Project Structure 🌲

This document provides an overview of the TimberJ project structure and organization.

## Directory Structure

```
TimberJ/
├── .github/                    # GitHub-specific files
│   └── workflows/             # GitHub Actions CI/CD
│       └── ci.yml            # Continuous Integration workflow
├── examples/                   # Example implementations
│   ├── basic-usage.ts        # Basic logging examples
│   ├── service-pattern.ts    # Service-based architecture examples
│   ├── environment-config.ts # Environment configuration examples
│   ├── test-example.ts       # Testing examples and patterns
│   └── package.json          # Examples package configuration
├── tests/                     # Test files
│   └── TimberJ.test.ts       # Main library tests
├── dist/                      # Built output (generated)
├── TimberJ.ts                # Main library source code
├── package.json              # Main package configuration
├── tsconfig.json             # TypeScript configuration
├── .eslintrc.js              # ESLint configuration
├── jest.config.js            # Jest testing configuration
├── .gitignore                # Git ignore rules
├── LICENSE                   # MIT License
├── README.md                 # Main documentation
├── CHANGELOG.md              # Version history
├── CONTRIBUTING.md           # Contribution guidelines
├── PROJECT_STRUCTURE.md      # This file
├── build.sh                  # Build script
├── demo.js                   # Demo script
└── benchmark.js              # Performance benchmark script
```

## File Descriptions

### Core Library Files

- **`TimberJ.ts`** - Main library source code containing the logging classes and functionality
- **`package.json`** - NPM package configuration with scripts, dependencies, and metadata
- **`tsconfig.json`** - TypeScript compiler configuration
- **`.eslintrc.js`** - ESLint configuration for code quality and consistency

### Testing & Quality

- **`tests/TimberJ.test.ts`** - Comprehensive test suite using Jest
- **`jest.config.js`** - Jest testing framework configuration
- **`.github/workflows/ci.yml`** - GitHub Actions CI/CD pipeline

### Documentation

- **`README.md`** - Main documentation with usage examples and API reference
- **`CHANGELOG.md`** - Version history and change tracking
- **`CONTRIBUTING.md`** - Guidelines for contributors
- **`PROJECT_STRUCTURE.md`** - This file explaining project organization

### Examples & Demos

- **`examples/`** - Directory containing various usage examples
  - `basic-usage.ts` - Basic logging functionality examples
  - `service-pattern.ts` - Service-based architecture patterns
  - `environment-config.ts` - Environment-based configuration
  - `test-example.ts` - Testing patterns and examples
- **`demo.js`** - Simple demo script for basic usage
- **`benchmark.js`** - Performance benchmarking script

### Build & Scripts

- **`build.sh`** - Executable build script for building the library
- **`dist/`** - Generated output directory (created during build)

## Key Components

### TimberJ Class
The main logging class that provides:
- Static `plant()` method for initialization
- Static `tag()` method for creating tagged loggers
- Singleton pattern for global configuration

### TimberJBuilder Class
Builder class for creating and configuring loggers:
- `setTag()` - Set the log tag
- `setLevel()` - Set the log level
- Logging methods: `d()`, `l()`, `i()`, `w()`, `e()`

### Log Levels
Six configurable log levels:
- `LEVEL_D` (0) - Debug (most verbose)
- `LEVEL_L` (1) - Log
- `LEVEL_I` (2) - Info
- `LEVEL_W` (3) - Warning
- `LEVEL_E` (4) - Error
- `LEVEL_NOT_PLANTED` (5) - Default state

## Development Workflow

1. **Setup**: `npm install` to install dependencies
2. **Development**: Edit `TimberJ.ts` and example files
3. **Testing**: `npm test` to run tests
4. **Linting**: `npm run lint` to check code quality
5. **Building**: `npm run build` to compile TypeScript
6. **Examples**: `npm run examples` to run examples
7. **Demo**: `npm run demo` to run the demo script
8. **Benchmark**: `npm run benchmark` to run performance tests

## Build Process

The build process:
1. TypeScript compilation (`tsc`)
2. Output to `dist/` directory
3. Generates JavaScript, type definitions, and source maps
4. Prepares package for NPM publishing

## Testing Strategy

- **Unit Tests**: Comprehensive testing of all public APIs
- **Integration Tests**: Testing of example patterns and usage
- **Performance Tests**: Benchmarking of logging performance
- **CI/CD**: Automated testing on multiple Node.js versions

## Code Quality

- **TypeScript**: Strict type checking and modern JavaScript features
- **ESLint**: Code style and quality enforcement
- **Prettier**: Consistent code formatting (if configured)
- **Git Hooks**: Pre-commit validation (if configured)

## Contributing

See `CONTRIBUTING.md` for detailed guidelines on:
- Setting up development environment
- Code style and conventions
- Testing requirements
- Pull request process
- Release procedures

---

This structure ensures a clean, maintainable, and professional Node.js library that's easy to understand, test, and contribute to.
