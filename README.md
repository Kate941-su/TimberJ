# TimberJ 🌲

A lightweight, hierarchical logging library for Node.js with configurable log levels and tag-based organization. TimberJ provides a clean, builder-pattern API for structured logging with automatic level filtering.

## Features

- 🎯 **Configurable Log Levels**: 6 different log levels (DEBUG, LOG, INFO, WARN, ERROR, NOT_PLANTED)
- 🏷️ **Tag-based Organization**: Organize logs with meaningful tags for better debugging
- 🌱 **Plant & Grow Pattern**: Initialize once, use everywhere with automatic level inheritance
- 🚀 **Zero Dependencies**: Lightweight with no external dependencies
- 📝 **TypeScript Support**: Full TypeScript support with type definitions
- 🔧 **Builder Pattern**: Fluent API for easy configuration

## Installation

```bash
npm install timberj
```

## Quick Start

```typescript
import { TimberJ, LEVEL_I } from 'timberj';

// Plant TimberJ with your desired log level
TimberJ.plant(LEVEL_I);

// Use it with tags
TimberJ.tag('UserService').i('User logged in successfully');
TimberJ.tag('Database').w('Connection timeout, retrying...');
TimberJ.tag('API').e('Failed to fetch user data');
```

## Log Levels

TimberJ supports 6 log levels, each with a specific priority:

| Level | Constant | Priority | Description |
|-------|----------|----------|-------------|
| DEBUG | `LEVEL_D` | 0 | Most verbose, shows all logs |
| LOG | `LEVEL_L` | 1 | Standard logging level |
| INFO | `LEVEL_I` | 2 | Informational messages |
| WARN | `LEVEL_W` | 3 | Warning messages |
| ERROR | `LEVEL_E` | 4 | Error messages only |
| NOT_PLANTED | `LEVEL_NOT_PLANTED` | 5 | Default state, no logs shown |

**Important**: Logs are shown based on priority - setting a level will show all logs of that level and higher priority.

## API Reference

### TimberJ.plant(level: Level)

Initialize TimberJ with a specific log level. This must be called before using any logging methods.

```typescript
import { TimberJ, LEVEL_I } from 'timberj';

// Initialize with INFO level
TimberJ.plant(LEVEL_I);
```

### TimberJ.tag(tag: string): TimberJBuilder

Create a new logger instance with a specific tag. Returns a builder object with logging methods.

```typescript
const logger = TimberJ.tag('MyService');
```

### TimberJBuilder Methods

The builder object provides the following logging methods:

- `.d(message: string)` - Debug logging
- `.l(message: string)` - Standard logging  
- `.i(message: string)` - Info logging
- `.w(message: string)` - Warning logging
- `.e(message: string)` - Error logging

Each method automatically includes the tag and respects the configured log level.

## Usage Examples

### Basic Usage

```typescript
import { TimberJ, LEVEL_D } from 'timberj';

// Initialize with DEBUG level (shows all logs)
TimberJ.plant(LEVEL_D);

// Simple logging
TimberJ.tag('App').i('Application started');
TimberJ.tag('Database').d('Connecting to database...');
TimberJ.tag('API').w('Rate limit approaching');
TimberJ.tag('Error').e('Failed to process request');
```

### Service-based Logging

```typescript
import { TimberJ, LEVEL_I } from 'timberj';

class UserService {
  private logger = TimberJ.tag('UserService');

  async createUser(userData: any) {
    this.logger.i('Creating new user');
    
    try {
      // ... user creation logic
      this.logger.i('User created successfully');
    } catch (error) {
      this.logger.e(`Failed to create user: ${error.message}`);
      throw error;
    }
  }

  async getUser(id: string) {
    this.logger.d(`Fetching user with ID: ${id}`);
    
    // ... user fetching logic
    this.logger.i('User retrieved successfully');
  }
}
```

### Environment-based Configuration

```typescript
import { TimberJ, LEVEL_D, LEVEL_W } from 'timberj';

// Configure based on environment
const logLevel = process.env.NODE_ENV === 'development' ? LEVEL_D : LEVEL_W;
TimberJ.plant(logLevel);

// In development: all logs shown
// In production: only warnings and errors shown
```

### Chaining Multiple Tags

```typescript
import { TimberJ, LEVEL_I } from 'timberJ';

TimberJ.plant(LEVEL_I);

// Chain multiple operations
TimberJ.tag('Auth')
  .setTag('UserLogin')
  .i('User authentication started');

TimberJ.tag('Database')
  .setTag('Connection')
  .w('Connection pool running low');
```

## Best Practices

1. **Plant Early**: Always call `TimberJ.plant()` at the start of your application
2. **Use Meaningful Tags**: Create tags that clearly identify the source of logs
3. **Choose Appropriate Levels**: Use DEBUG for development, INFO for production
4. **Consistent Tagging**: Use consistent tag patterns across your application
5. **Error Context**: Always log errors with sufficient context for debugging

## Development

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

### Linting

```bash
npm run lint
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Changelog

### v1.0.0
- Initial release
- Core logging functionality
- Tag-based organization
- Configurable log levels
- TypeScript support

---

**TimberJ** - Because every good forest needs a logger! 🌲📝

# Reference
I am inspired by [Timber](https://github.com/JakeWharton/timber), which is a light weight logger created by Kotlin.
