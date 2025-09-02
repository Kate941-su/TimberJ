#!/usr/bin/env node

/**
 * TimberJ Performance Benchmark
 * 
 * This script benchmarks the performance of TimberJ logging
 * Run with: node benchmark.js
 */

const { TimberJ, LEVEL_D } = require('./dist/TimberJ');

// Performance measurement utility
function measurePerformance(name, fn, iterations = 10000) {
  const start = process.hrtime.bigint();
  
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  
  const end = process.hrtime.bigint();
  const duration = Number(end - start) / 1000000; // Convert to milliseconds
  const opsPerSecond = Math.round((iterations / duration) * 1000);
  
  console.log(`${name}:`);
  console.log(`  ${iterations.toLocaleString()} operations in ${duration.toFixed(2)}ms`);
  console.log(`  ${opsPerSecond.toLocaleString()} ops/sec`);
  console.log(`  ${(duration / iterations * 1000000).toFixed(3)}μs per operation\n`);
  
  return { duration, opsPerSecond };
}

console.log('🚀 TimberJ Performance Benchmark\n');

// Initialize TimberJ
TimberJ.plant(LEVEL_D);

// Benchmark 1: Basic logging
console.log('1. Basic Logging Performance:');
const basicLogger = TimberJ.tag('Benchmark');

measurePerformance('Info logging', () => {
  basicLogger.i('Performance test message');
});

measurePerformance('Debug logging', () => {
  basicLogger.d('Performance test message');
});

measurePerformance('Warning logging', () => {
  basicLogger.w('Performance test message');
});

measurePerformance('Error logging', () => {
  basicLogger.e('Performance test message');
});

// Benchmark 2: Tag creation
console.log('2. Tag Creation Performance:');
measurePerformance('Tag creation', () => {
  TimberJ.tag('NewTag');
});

// Benchmark 3: Mixed operations
console.log('3. Mixed Operations Performance:');
measurePerformance('Mixed logging operations', () => {
  const logger = TimberJ.tag('Mixed');
  logger.i('Info message');
  logger.d('Debug message');
  logger.w('Warning message');
  logger.e('Error message');
});

// Benchmark 4: Console vs TimberJ
console.log('4. Console vs TimberJ Comparison:');
const iterations = 10000;

// Console performance
const consoleStart = process.hrtime.bigint();
for (let i = 0; i < iterations; i++) {
  console.info('[Console] Performance test message');
}
const consoleEnd = process.hrtime.bigint();
const consoleDuration = Number(consoleEnd - consoleStart) / 1000000;

// TimberJ performance
const timberStart = process.hrtime.bigint();
for (let i = 0; i < iterations; i++) {
  basicLogger.i('Performance test message');
}
const timberEnd = process.hrtime.bigint();
const timberDuration = Number(timberEnd - timberStart) / 1000000;

console.log('Console.info:');
console.log(`  ${iterations.toLocaleString()} operations in ${consoleDuration.toFixed(2)}ms`);
console.log(`  ${Math.round((iterations / consoleDuration) * 1000).toLocaleString()} ops/sec\n`);

console.log('TimberJ.info:');
console.log(`  ${iterations.toLocaleString()} operations in ${timberDuration.toFixed(2)}ms`);
console.log(`  ${Math.round((iterations / timberDuration) * 1000).toLocaleString()} ops/sec\n`);

const overhead = ((timberDuration - consoleDuration) / consoleDuration * 100);
console.log(`Performance overhead: ${overhead > 0 ? '+' : ''}${overhead.toFixed(2)}%`);

console.log('\n✅ Benchmark complete!');
console.log('\n💡 Note: Performance may vary based on system and Node.js version.');
console.log('   These benchmarks are for relative comparison only.');
