import { TimberJ, LEVEL_I } from "../src/TimberJ";

// Initialize TimberJ
TimberJ.plant(LEVEL_I);

console.log("=== TimberJ Service Pattern Example ===\n");

// Simulate a user service
class UserService {
  private logger = TimberJ.tag("UserService");

  async createUser(userData: { name: string; email: string }) {
    this.logger.i(`Creating user: ${userData.name} (${userData.email})`);

    try {
      // Simulate some async work
      await this.validateUserData(userData);
      await this.checkEmailAvailability(userData.email);
      await this.saveUserToDatabase(userData);

      this.logger.i(`User ${userData.name} created successfully`);
      return { success: true, userId: "user_123" };
    } catch (error) {
      this.logger.e(`Failed to create user ${userData.name}: ${error.message}`);
      throw error;
    }
  }

  async getUser(id: string) {
    this.logger.i(`Fetching user with ID: ${id}`);

    try {
      // Simulate database lookup
      const user = await this.lookupUserInDatabase(id);
      this.logger.i(`User ${id} retrieved successfully`);
      return user;
    } catch (error) {
      this.logger.e(`Failed to retrieve user ${id}: ${error.message}`);
      throw error;
    }
  }

  private async validateUserData(userData: any) {
    this.logger.d("Validating user data...");
    if (!userData.name || !userData.email) {
      throw new Error("Name and email are required");
    }
    // Simulate validation delay
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  private async checkEmailAvailability(email: string) {
    this.logger.d(`Checking email availability: ${email}`);
    // Simulate email check
    await new Promise((resolve) => setTimeout(resolve, 150));
    if (email === "taken@example.com") {
      throw new Error("Email already taken");
    }
  }

  private async saveUserToDatabase(userData: any) {
    this.logger.d("Saving user to database...");
    // Simulate database save
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  private async lookupUserInDatabase(id: string) {
    this.logger.d(`Looking up user ${id} in database...`);
    // Simulate database lookup
    await new Promise((resolve) => setTimeout(resolve, 100));
    if (id === "nonexistent") {
      throw new Error("User not found");
    }
    return { id, name: "John Doe", email: "john@example.com" };
  }
}

// Simulate a payment service
class PaymentService {
  private logger = TimberJ.tag("PaymentService");

  async processPayment(amount: number, userId: string) {
    this.logger.i(`Processing payment of $${amount} for user ${userId}`);

    try {
      await this.validatePayment(amount);
      await this.chargeCard(amount, userId);
      await this.updatePaymentHistory(amount, userId);

      this.logger.i(
        `Payment of $${amount} processed successfully for user ${userId}`
      );
      return { success: true, transactionId: "txn_456" };
    } catch (error) {
      this.logger.e(`Payment failed for user ${userId}: ${error.message}`);
      throw error;
    }
  }

  private async validatePayment(amount: number) {
    this.logger.d(`Validating payment amount: $${amount}`);
    if (amount <= 0) {
      throw new Error("Invalid payment amount");
    }
    if (amount > 10000) {
      throw new Error("Payment amount exceeds limit");
    }
  }

  private async chargeCard(amount: number, userId: string) {
    this.logger.d(`Charging card for user ${userId}: $${amount}`);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Simulate occasional failure
    if (Math.random() < 0.1) {
      throw new Error("Card declined");
    }
  }

  private async updatePaymentHistory(amount: number, userId: string) {
    this.logger.d(`Updating payment history for user ${userId}`);
    // Simulate database update
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

// Main application logic
async function main() {
  const userService = new UserService();
  const paymentService = new PaymentService();

  try {
    // Create a user
    console.log("1. Creating a new user...");
    const user = await userService.createUser({
      name: "Jane Smith",
      email: "jane@example.com",
    });
    console.log(`User created: ${JSON.stringify(user)}\n`);

    // Get the user
    console.log("2. Retrieving the user...");
    const retrievedUser = await userService.getUser(user.userId);
    console.log(`User retrieved: ${JSON.stringify(retrievedUser)}\n`);

    // Process a payment
    console.log("3. Processing a payment...");
    const payment = await paymentService.processPayment(99.99, user.userId);
    console.log(`Payment processed: ${JSON.stringify(payment)}\n`);

    // Try to get a non-existent user (will fail)
    console.log("4. Trying to get a non-existent user...");
    try {
      await userService.getUser("nonexistent");
    } catch (error) {
      console.log(`Expected error: ${error.message}\n`);
    }

    // Try to create user with taken email (will fail)
    console.log("5. Trying to create user with taken email...");
    try {
      await userService.createUser({
        name: "Duplicate User",
        email: "taken@example.com",
      });
    } catch (error) {
      console.log(`Expected error: ${error.message}\n`);
    }
  } catch (error) {
    console.error("Unexpected error:", error.message);
  }
}

// Run the example
main().then(() => {
  console.log("=== Service Pattern Example Complete ===");
});
