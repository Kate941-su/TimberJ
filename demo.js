#!/usr/bin/env node

/**
 * TimberJ Demo Script
 * 
 * This script demonstrates the basic usage of TimberJ
 * Run with: node demo.js
 */

// Import the built library (make sure to run npm run build first)
const { TimberJ, LEVEL_D, LEVEL_I, LEVEL_W } = require('./dist/TimberJ');

console.log('🌲 TimberJ Demo\n');

// Initialize with DEBUG level (shows all logs)
console.log('1. Initializing with DEBUG level:');
TimberJ.plant(LEVEL_D);

// Basic logging
TimberJ.tag('App').i('Application started');
TimberJ.tag('Database').d('Connecting to database...');
TimberJ.tag('API').w('Rate limit approaching');
TimberJ.tag('Error').e('Failed to process request');

console.log('\n2. Changing to INFO level (hides DEBUG logs):');
TimberJ.plant(LEVEL_I);

TimberJ.tag('App').i('Application started');
TimberJ.tag('Database').d('This debug message will NOT show');
TimberJ.tag('API').w('Rate limit approaching');
TimberJ.tag('Error').e('Failed to process request');

console.log('\n3. Changing to WARNING level (only warnings and errors):');
TimberJ.plant(LEVEL_W);

TimberJ.tag('App').i('This info message will NOT show');
TimberJ.tag('Database').d('This debug message will NOT show');
TimberJ.tag('API').w('Rate limit approaching - THIS WILL SHOW');
TimberJ.tag('Error').e('Failed to process request - THIS WILL SHOW');

console.log('\n4. Service-based logging example:');
TimberJ.plant(LEVEL_I);

class UserService {
  constructor() {
    this.logger = TimberJ.tag('UserService');
  }

  async createUser(name, email) {
    this.logger.i(`Creating user: ${name} (${email})`);
    
    try {
      // Simulate some work
      await this.validateUser(name, email);
      await this.saveUser(name, email);
      
      this.logger.i(`User ${name} created successfully`);
      return { success: true, userId: 'user_123' };
    } catch (error) {
      this.logger.e(`Failed to create user ${name}: ${error.message}`);
      throw error;
    }
  }

  async validateUser(name, email) {
    this.logger.d('Validating user data...');
    if (!name || !email) {
      throw new Error('Name and email are required');
    }
  }

  async saveUser(name, email) {
    this.logger.d('Saving user to database...');
    // Simulate database save
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

// Use the service
const userService = new UserService();
userService.createUser('John Doe', 'john@example.com')
  .then(user => {
    console.log(`\n✅ User created: ${JSON.stringify(user)}`);
  })
  .catch(error => {
    console.log(`\n❌ Error: ${error.message}`);
  })
  .finally(() => {
    console.log('\n🌲 Demo complete!');
  });
