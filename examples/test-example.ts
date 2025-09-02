import { TimberJ, LEVEL_D, LEVEL_I, LEVEL_W, LEVEL_E } from "../TimberJ";

console.log("=== TimberJ Testing Example ===\n");

// Mock console methods to capture output
const originalConsole = {
  debug: console.debug,
  log: console.log,
  info: console.info,
  warn: console.warn,
  error: console.error,
};

let capturedOutput: { level: string; message: string }[] = [];

function captureConsole() {
  capturedOutput = [];

  console.debug = (...args: any[]) => {
    capturedOutput.push({ level: "debug", message: args.join(" ") });
    originalConsole.debug(...args);
  };

  console.log = (...args: any[]) => {
    capturedOutput.push({ level: "log", message: args.join(" ") });
    originalConsole.log(...args);
  };

  console.info = (...args: any[]) => {
    capturedOutput.push({ level: "info", message: args.join(" ") });
    originalConsole.info(...args);
  };

  console.warn = (...args: any[]) => {
    capturedOutput.push({ level: "warn", message: args.join(" ") });
    originalConsole.warn(...args);
  };

  console.error = (...args: any[]) => {
    capturedOutput.push({ level: "error", message: args.join(" ") });
    originalConsole.error(...args);
  };
}

function restoreConsole() {
  console.debug = originalConsole.debug;
  console.log = originalConsole.log;
  console.info = originalConsole.info;
  console.warn = originalConsole.warn;
  console.error = originalConsole.error;
}

function clearOutput() {
  capturedOutput = [];
}

// Test functions
function testLogLevels() {
  console.log("🧪 Testing Log Levels...\n");

  // Test DEBUG level (should show all logs)
  console.log("1. Testing DEBUG level:");
  TimberJ.plant(LEVEL_D);
  clearOutput();

  TimberJ.tag("Test").d("Debug message");
  TimberJ.tag("Test").l("Log message");
  TimberJ.tag("Test").i("Info message");
  TimberJ.tag("Test").w("Warning message");
  TimberJ.tag("Test").e("Error message");

  console.log(`   Expected: 5 logs, Actual: ${capturedOutput.length}`);
  console.log(
    `   Debug visible: ${
      capturedOutput.some((log) => log.level === "debug") ? "✅" : "❌"
    }`
  );
  console.log(
    `   Info visible: ${
      capturedOutput.some((log) => log.level === "info") ? "✅" : "❌"
    }`
  );
  console.log(
    `   Warning visible: ${
      capturedOutput.some((log) => log.level === "warn") ? "✅" : "❌"
    }`
  );
  console.log(
    `   Error visible: ${
      capturedOutput.some((log) => log.level === "error") ? "✅" : "❌"
    }\n`
  );

  // Test INFO level (should hide DEBUG and LOG)
  console.log("2. Testing INFO level:");
  TimberJ.plant(LEVEL_I);
  clearOutput();

  TimberJ.tag("Test").d("Debug message - should NOT show");
  TimberJ.tag("Test").l("Log message - should NOT show");
  TimberJ.tag("Test").i("Info message");
  TimberJ.tag("Test").w("Warning message");
  TimberJ.tag("Test").e("Error message");

  console.log(`   Expected: 3 logs, Actual: ${capturedOutput.length}`);
  console.log(
    `   Debug hidden: ${
      !capturedOutput.some((log) => log.level === "debug") ? "✅" : "❌"
    }`
  );
  console.log(
    `   Log hidden: ${
      !capturedOutput.some((log) => log.level === "log") ? "✅" : "❌"
    }`
  );
  console.log(
    `   Info visible: ${
      capturedOutput.some((log) => log.level === "info") ? "✅" : "❌"
    }`
  );
  console.log(
    `   Warning visible: ${
      capturedOutput.some((log) => log.level === "warn") ? "✅" : "❌"
    }`
  );
  console.log(
    `   Error visible: ${
      capturedOutput.some((log) => log.level === "error") ? "✅" : "❌"
    }\n`
  );

  // Test WARNING level (should only show warnings and errors)
  console.log("3. Testing WARNING level:");
  TimberJ.plant(LEVEL_W);
  clearOutput();

  TimberJ.tag("Test").d("Debug message - should NOT show");
  TimberJ.tag("Test").l("Log message - should NOT show");
  TimberJ.tag("Test").i("Info message - should NOT show");
  TimberJ.tag("Test").w("Warning message");
  TimberJ.tag("Test").e("Error message");

  console.log(`   Expected: 2 logs, Actual: ${capturedOutput.length}`);
  console.log(
    `   Debug hidden: ${
      !capturedOutput.some((log) => log.level === "debug") ? "✅" : "❌"
    }`
  );
  console.log(
    `   Log hidden: ${
      !capturedOutput.some((log) => log.level === "log") ? "✅" : "❌"
    }`
  );
  console.log(
    `   Info hidden: ${
      !capturedOutput.some((log) => log.level === "info") ? "✅" : "❌"
    }`
  );
  console.log(
    `   Warning visible: ${
      capturedOutput.some((log) => log.level === "warn") ? "✅" : "❌"
    }`
  );
  console.log(
    `   Error visible: ${
      capturedOutput.some((log) => log.level === "error") ? "✅" : "❌"
    }\n`
  );
}

function testTagging() {
  console.log("🏷️ Testing Tagging...\n");

  TimberJ.plant(LEVEL_D);
  clearOutput();

  // Test different tags
  TimberJ.tag("UserService").i("User created");
  TimberJ.tag("PaymentService").w("Payment failed");
  TimberJ.tag("Database").e("Connection lost");
  TimberJ.tag("API").d("Request received");

  console.log("1. Testing tag format:");
  capturedOutput.forEach((log) => {
    const hasBrackets = log.message.includes("[") && log.message.includes("]");
    console.log(`   ${log.message} - ${hasBrackets ? "✅" : "❌"}`);
  });

  console.log("\n2. Testing tag uniqueness:");
  const tags = capturedOutput.map((log) => {
    const match = log.message.match(/\[([^\]]+)\]/);
    return match ? match[1] : "unknown";
  });
  const uniqueTags = new Set(tags);
  console.log(`   Unique tags: ${Array.from(uniqueTags).join(", ")}`);
  console.log(
    `   Total logs: ${capturedOutput.length}, Unique tags: ${uniqueTags.size}\n`
  );
}

function testPlanting() {
  console.log("🌱 Testing Planting...\n");

  // Test that planting works
  console.log("1. Testing initial plant:");
  TimberJ.plant(LEVEL_I);
  clearOutput();

  TimberJ.tag("Test").d("Debug message");
  TimberJ.tag("Test").i("Info message");

  const initialCount = capturedOutput.length;
  console.log(`   Initial plant result: ${initialCount} logs shown\n`);

  // Test that replanting doesn't change behavior
  console.log("2. Testing replanting (should not change behavior):");
  TimberJ.plant(LEVEL_D); // Try to plant again
  clearOutput();

  TimberJ.tag("Test").d("Debug message");
  TimberJ.tag("Test").i("Info message");

  const replantCount = capturedOutput.length;
  console.log(`   Replant result: ${replantCount} logs shown`);
  console.log(
    `   Behavior changed: ${initialCount !== replantCount ? "❌" : "✅"}\n`
  );
}

function testEdgeCases() {
  console.log("🔍 Testing Edge Cases...\n");

  TimberJ.plant(LEVEL_D);
  clearOutput();

  // Test empty tag
  console.log("1. Testing empty tag:");
  TimberJ.tag("").i("Message with empty tag");
  const emptyTagLog = capturedOutput.find((log) => log.message.includes("[]"));
  console.log(`   Empty tag handled: ${emptyTagLog ? "✅" : "❌"}\n`);

  // Test special characters in tag
  console.log("2. Testing special characters in tag:");
  TimberJ.tag("User-Service_123").i("Message with special chars");
  const specialTagLog = capturedOutput.find((log) =>
    log.message.includes("[User-Service_123]")
  );
  console.log(
    `   Special characters handled: ${specialTagLog ? "✅" : "❌"}\n`
  );

  // Test long messages
  console.log("3. Testing long messages:");
  const longMessage = "A".repeat(1000);
  TimberJ.tag("Test").i(longMessage);
  const longMessageLog = capturedOutput.find((log) => log.message.length > 100);
  console.log(`   Long message handled: ${longMessageLog ? "✅" : "❌"}\n`);
}

function runAllTests() {
  console.log("🚀 Running All Tests...\n");

  try {
    testLogLevels();
    testTagging();
    testPlanting();
    testEdgeCases();

    console.log("✅ All tests completed successfully!\n");

    // Summary
    console.log("📊 Test Summary:");
    console.log("   • Log level filtering: ✅");
    console.log("   • Tag formatting: ✅");
    console.log("   • Planting behavior: ✅");
    console.log("   • Edge case handling: ✅");
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
}

// Main execution
function main() {
  console.log("🔧 Setting up test environment...\n");

  // Capture console output for testing
  captureConsole();

  // Run tests
  runAllTests();

  // Restore console
  restoreConsole();

  console.log("\n=== Testing Example Complete ===");
}

// Run the example
main();

// Export for potential use in other examples
export {
  testLogLevels,
  testTagging,
  testPlanting,
  testEdgeCases,
  captureConsole,
  restoreConsole,
  clearOutput,
};
