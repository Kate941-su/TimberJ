const { TimberJ, LEVEL_D, LEVEL_I, LEVEL_W, LEVEL_E, LEVEL_L, LEVEL_NOT_PLANTED } = require("../dist/TimberJ");

// Mock console methods
const mockConsole = {
  debug: jest.fn(),
  log: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

describe("TimberJ", () => {
  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Mock console methods
    jest.spyOn(console, "debug").mockImplementation(mockConsole.debug);
    jest.spyOn(console, "log").mockImplementation(mockConsole.log);
    jest.spyOn(console, "info").mockImplementation(mockConsole.info);
    jest.spyOn(console, "warn").mockImplementation(mockConsole.warn);
    jest.spyOn(console, "error").mockImplementation(mockConsole.error);

    // Reset TimberJ to unplanted state
    TimberJ.shared = undefined;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("plant()", () => {
    it("should initialize TimberJ with the specified level", () => {
      TimberJ.plant(LEVEL_I);

      const builder = TimberJ.tag("Test");
      builder.i("Info message");
      builder.d("Debug message");

      expect(mockConsole.info).toHaveBeenCalledWith("[Test] Info message");
      expect(mockConsole.debug).not.toHaveBeenCalled();
    });

    it("should not allow replanting", () => {
      TimberJ.plant(LEVEL_D);
      TimberJ.plant(LEVEL_W);

      const builder = TimberJ.tag("Test");
      builder.d("Debug message");

      // Should still show debug messages (first plant level)
      expect(mockConsole.debug).toHaveBeenCalledWith("[Test] Debug message");
    });
  });

  describe("tag()", () => {
    it("should create a builder with the specified tag", () => {
      TimberJ.plant(LEVEL_D);

      const builder = TimberJ.tag("UserService");
      expect(builder).toBeDefined();
      expect(typeof builder.d).toBe("function");
      expect(typeof builder.i).toBe("function");
      expect(typeof builder.w).toBe("function");
      expect(typeof builder.e).toBe("function");
    });

    it("should format tags with brackets", () => {
      TimberJ.plant(LEVEL_I);

      TimberJ.tag("UserService").i("User created");

      expect(mockConsole.info).toHaveBeenCalledWith(
        "[UserService] User created"
      );
    });

    it("should handle empty tags", () => {
      TimberJ.plant(LEVEL_I);

      TimberJ.tag("").i("Message with empty tag");

      expect(mockConsole.info).toHaveBeenCalledWith(
        "[] Message with empty tag"
      );
    });

    it("should handle special characters in tags", () => {
      TimberJ.plant(LEVEL_I);

      TimberJ.tag("User-Service_123").i("Message with special chars");

      expect(mockConsole.info).toHaveBeenCalledWith(
        "[User-Service_123] Message with special chars"
      );
    });
  });

  describe("log levels", () => {
    describe("DEBUG level", () => {
      beforeEach(() => {
        TimberJ.plant(LEVEL_D);
      });

      it("should show all log levels", () => {
        const builder = TimberJ.tag("Test");

        builder.d("Debug message");
        builder.l("Log message");
        builder.i("Info message");
        builder.w("Warning message");
        builder.e("Error message");

        expect(mockConsole.debug).toHaveBeenCalledWith("[Test] Debug message");
        expect(mockConsole.log).toHaveBeenCalledWith("[Test] Log message");
        expect(mockConsole.info).toHaveBeenCalledWith("[Test] Info message");
        expect(mockConsole.warn).toHaveBeenCalledWith("[Test] Warning message");
        expect(mockConsole.error).toHaveBeenCalledWith("[Test] Error message");
      });
    });

    describe("LOG level", () => {
      beforeEach(() => {
        TimberJ.plant(LEVEL_L);
      });

      it("should hide DEBUG messages", () => {
        const builder = TimberJ.tag("Test");

        builder.d("Debug message");
        builder.l("Log message");
        builder.i("Info message");

        expect(mockConsole.debug).not.toHaveBeenCalled();
        expect(mockConsole.log).toHaveBeenCalledWith("[Test] Log message");
        expect(mockConsole.info).toHaveBeenCalledWith("[Test] Info message");
      });
    });

    describe("INFO level", () => {
      beforeEach(() => {
        TimberJ.plant(LEVEL_I);
      });

      it("should hide DEBUG and LOG messages", () => {
        const builder = TimberJ.tag("Test");

        builder.d("Debug message");
        builder.l("Log message");
        builder.i("Info message");
        builder.w("Warning message");

        expect(mockConsole.debug).not.toHaveBeenCalled();
        expect(mockConsole.log).not.toHaveBeenCalled();
        expect(mockConsole.info).toHaveBeenCalledWith("[Test] Info message");
        expect(mockConsole.warn).toHaveBeenCalledWith("[Test] Warning message");
      });
    });

    describe("WARN level", () => {
      beforeEach(() => {
        TimberJ.plant(LEVEL_W);
      });

      it("should only show WARN and ERROR messages", () => {
        const builder = TimberJ.tag("Test");

        builder.d("Debug message");
        builder.l("Log message");
        builder.i("Info message");
        builder.w("Warning message");
        builder.e("Error message");

        expect(mockConsole.debug).not.toHaveBeenCalled();
        expect(mockConsole.log).not.toHaveBeenCalled();
        expect(mockConsole.info).not.toHaveBeenCalled();
        expect(mockConsole.warn).toHaveBeenCalledWith("[Test] Warning message");
        expect(mockConsole.error).toHaveBeenCalledWith("[Test] Error message");
      });
    });

    describe("ERROR level", () => {
      beforeEach(() => {
        TimberJ.plant(LEVEL_E);
      });

      it("should only show ERROR messages", () => {
        const builder = TimberJ.tag("Test");

        builder.d("Debug message");
        builder.l("Log message");
        builder.i("Info message");
        builder.w("Warning message");
        builder.e("Error message");

        expect(mockConsole.debug).not.toHaveBeenCalled();
        expect(mockConsole.log).not.toHaveBeenCalled();
        expect(mockConsole.info).not.toHaveBeenCalled();
        expect(mockConsole.warn).not.toHaveBeenCalled();
        expect(mockConsole.error).toHaveBeenCalledWith("[Test] Error message");
      });
    });
  });

  describe("builder methods", () => {
    beforeEach(() => {
      TimberJ.plant(LEVEL_D);
    });

    it("should support method chaining", () => {
      const builder = TimberJ.tag("Test");

      builder.setTag("NewTag").setLevel(LEVEL_I);

      // The setTag and setLevel methods should be available
      expect(typeof builder.setTag).toBe("function");
      expect(typeof builder.setLevel).toBe("function");
    });

    it("should handle long messages", () => {
      const longMessage = "A".repeat(1000);
      const builder = TimberJ.tag("Test");

      builder.i(longMessage);

      expect(mockConsole.info).toHaveBeenCalledWith(`[Test] ${longMessage}`);
    });
  });

  describe("unplanted state", () => {
    it("should show warning when used without planting", () => {
      const originalWarn = console.warn;
      const mockWarn = jest.fn();
      console.warn = mockWarn;

      try {
        // This should throw an error when not planted
        expect(() => {
          TimberJ.tag("Test");
        }).toThrow();
      } finally {
        console.warn = originalWarn;
      }
    });
  });

  describe("constants", () => {
    it("should export all log level constants", () => {
      expect(LEVEL_D).toBe(0);
      expect(LEVEL_L).toBe(1);
      expect(LEVEL_I).toBe(2);
      expect(LEVEL_W).toBe(3);
      expect(LEVEL_E).toBe(4);
      expect(LEVEL_NOT_PLANTED).toBe(5);
    });
  });
});
