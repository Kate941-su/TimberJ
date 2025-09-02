import { TimberJ, LEVEL_D, LEVEL_I, LEVEL_W, LEVEL_E } from "../TimberJ";

console.log("=== TimberJ Environment Configuration Example ===\n");

// Simulate different environment configurations
const environments = {
  development: {
    name: "Development",
    logLevel: LEVEL_D,
    description: "Shows all logs for debugging",
  },
  staging: {
    name: "Staging",
    logLevel: LEVEL_I,
    description: "Shows info, warnings, and errors",
  },
  production: {
    name: "Production",
    logLevel: LEVEL_W,
    description: "Shows only warnings and errors",
  },
};

// Function to simulate environment detection
function getEnvironment(): keyof typeof environments {
  // In real apps, this would come from process.env.NODE_ENV
  const env = process.argv[2] || "development";
  return (env as keyof typeof environments) || "development";
}

// Function to configure logging based on environment
function configureLogging() {
  const env = getEnvironment();
  const config = environments[env];

  console.log(`🌍 Environment: ${config.name}`);
  console.log(`📝 Log Level: ${config.description}`);
  console.log(`🔧 Configuring TimberJ...\n`);

  TimberJ.plant(config.logLevel);

  return config;
}

// Function to demonstrate logging behavior
function demonstrateLogging(envName: string) {
  console.log(`\n📊 Logging demonstration for ${envName} environment:`);
  console.log("─".repeat(50));

  // These logs will show/hide based on the configured level
  TimberJ.tag("App").d("Debug: Application configuration loaded");
  TimberJ.tag("App").i("Info: Application started successfully");
  TimberJ.tag("App").w("Warning: Database connection pool running low");
  TimberJ.tag("App").e("Error: Failed to connect to external service");

  console.log("─".repeat(50));
}

// Function to simulate application startup
function simulateAppStartup() {
  console.log("🚀 Simulating application startup sequence...\n");

  // Database connection
  TimberJ.tag("Database").d("Debug: Initializing connection pool");
  TimberJ.tag("Database").i("Info: Database connected successfully");

  // Cache initialization
  TimberJ.tag("Cache").d("Debug: Setting up Redis connection");
  TimberJ.tag("Cache").i("Info: Cache service ready");

  // API routes
  TimberJ.tag("API").d("Debug: Registering API routes");
  TimberJ.tag("API").i("Info: API server listening on port 3000");

  // Background jobs
  TimberJ.tag("Jobs").d("Debug: Starting background job processor");
  TimberJ.tag("Jobs").i("Info: Background job processor started");

  // Security
  TimberJ.tag("Security").d("Debug: Loading security policies");
  TimberJ.tag("Security").i("Info: Security middleware configured");

  console.log("\n✅ Application startup complete!\n");
}

// Function to simulate runtime operations
function simulateRuntimeOperations() {
  console.log("⚡ Simulating runtime operations...\n");

  // User authentication
  TimberJ.tag("Auth").d("Debug: Validating JWT token");
  TimberJ.tag("Auth").i("Info: User authenticated successfully");

  // Payment processing
  TimberJ.tag("Payment").d("Debug: Processing payment request");
  TimberJ.tag("Payment").i("Info: Payment processed successfully");

  // Email sending
  TimberJ.tag("Email").d("Debug: Preparing email template");
  TimberJ.tag("Email").i("Info: Welcome email sent to user");

  // Database operations
  TimberJ.tag("Database").d("Debug: Executing database query");
  TimberJ.tag("Database").i("Info: User profile updated");

  // Error handling
  TimberJ.tag("Error").w("Warning: Rate limit approaching for API");
  TimberJ.tag("Error").e("Error: Failed to send notification email");

  console.log("\n✅ Runtime operations complete!\n");
}

// Main function
function main() {
  console.log("🔧 TimberJ Environment Configuration Example\n");

  // Configure logging for current environment
  const config = configureLogging();

  // Demonstrate logging behavior
  demonstrateLogging(config.name);

  // Simulate application startup
  simulateAppStartup();

  // Simulate runtime operations
  simulateRuntimeOperations();

  // Show final summary
  console.log("📋 Summary:");
  console.log(`   • Environment: ${config.name}`);
  console.log(`   • Log Level: ${config.description}`);
  console.log(
    `   • Debug logs: ${
      config.logLevel <= LEVEL_D ? "✅ Visible" : "❌ Hidden"
    }`
  );
  console.log(
    `   • Info logs: ${config.logLevel <= LEVEL_I ? "✅ Visible" : "❌ Hidden"}`
  );
  console.log(
    `   • Warning logs: ${
      config.logLevel <= LEVEL_W ? "✅ Visible" : "❌ Hidden"
    }`
  );
  console.log(
    `   • Error logs: ${
      config.logLevel <= LEVEL_E ? "✅ Visible" : "❌ Hidden"
    }`
  );

  console.log(
    "\n💡 Tip: Run with different environments to see the difference:"
  );
  console.log("   npm run example:dev     # Development (all logs)");
  console.log("   npm run example:staging # Staging (info+)");
  console.log("   npm run example:prod    # Production (warnings+)");

  console.log("\n=== Environment Configuration Example Complete ===");
}

// Run the example
main();

// Export for potential use in other examples
export { configureLogging, environments };
