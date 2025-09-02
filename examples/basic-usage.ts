import { TimberJ, LEVEL_D, LEVEL_I, LEVEL_W, LEVEL_E } from "../TimberJ";

console.log("=== TimberJ Basic Usage Example ===\n");

// Initialize TimberJ with DEBUG level (shows all logs)
TimberJ.plant(LEVEL_D);

console.log("1. Basic logging with different levels:");
TimberJ.tag("App").i("Application started");
TimberJ.tag("Database").d("Connecting to database...");
TimberJ.tag("API").w("Rate limit approaching");
TimberJ.tag("Error").e("Failed to process request");

console.log("\n2. Changing log level to INFO (hides DEBUG logs):");
TimberJ.plant(LEVEL_I);

TimberJ.tag("App").i("Application started");
TimberJ.tag("Database").d("This debug message will NOT show");
TimberJ.tag("API").w("Rate limit approaching");
TimberJ.tag("Error").e("Failed to process request");

console.log("\n3. Using different tags for organization:");
TimberJ.tag("UserService").i("User authentication started");
TimberJ.tag("PaymentService").w("Payment gateway timeout");
TimberJ.tag("EmailService").i("Welcome email sent");
TimberJ.tag("Security").e("Invalid login attempt detected");

console.log("\n4. Demonstrating level filtering:");
console.log("Setting level to WARN (only warnings and errors will show):");
TimberJ.plant(LEVEL_W);

TimberJ.tag("App").i("This info message will NOT show");
TimberJ.tag("Database").d("This debug message will NOT show");
TimberJ.tag("API").w("Rate limit approaching - THIS WILL SHOW");
TimberJ.tag("Error").e("Failed to process request - THIS WILL SHOW");

console.log("\n=== Example Complete ===");
