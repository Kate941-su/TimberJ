const LEVEL_D = 0;
const LEVEL_L = 1;
const LEVEL_I = 2;
const LEVEL_W = 3;
const LEVEL_E = 4;
const LEVEL_NOT_PLANTED = 5;

type Level =
  | typeof LEVEL_NOT_PLANTED
  | typeof LEVEL_D
  | typeof LEVEL_L
  | typeof LEVEL_I
  | typeof LEVEL_W
  | typeof LEVEL_E;

class TimberJBuilder {
  private tag: string = "";
  private level: Level = LEVEL_NOT_PLANTED;

  private warnIfNotPlanted = (level: Level) => {
    if (level === LEVEL_NOT_PLANTED) {
      console.warn(
        "TimberJ is not planted. Please call TimberJ.plant() before using TimberJ."
      );
      console.warn(
        "TimberJ.plant() is typically called in the root component of your app."
      );
      console.warn("For example, in your app/_layout.tsx file:");
      console.warn("```");
      console.warn("import { TimberJ } from '@/library/TimberJ';");
      console.warn("TimberJ.plant({ level: LEVEL_V });");
      console.warn("```");
      console.warn(
        "This will ensure that TimberJ is properly initialized before any logging occurs."
      );
    }
  };

  setTag = (tag: string) => {
    this.tag = tag;
    return this;
  };

  setLevel = (level: Level) => {
    this.level = level;
    return this;
  };

  d = (message: string) => {
    if (this.level <= LEVEL_D) {
      console.debug(`${this.tag} ${message}`);
    }
    this.warnIfNotPlanted(this.level);
  };

  l = (message: string) => {
    if (this.level <= LEVEL_L) {
      console.log(`${this.tag} ${message}`);
    }
    this.warnIfNotPlanted(this.level);
  };

  i = (message: string) => {
    if (this.level <= LEVEL_I) {
      console.info(`${this.tag} ${message}`);
    }
    this.warnIfNotPlanted(this.level);
  };

  w = (message: string) => {
    if (this.level <= LEVEL_W) {
      console.warn(`${this.tag} ${message}`);
    }
    this.warnIfNotPlanted(this.level);
  };

  e = (message: string) => {
    if (this.level <= LEVEL_E) {
      console.error(`${this.tag} ${message}`);
    }
    this.warnIfNotPlanted(this.level);
  };
}

class TimberJ {
  private level: Level = LEVEL_NOT_PLANTED;
  private static shared: TimberJ | undefined = undefined;
  static plant(level: Level) {
    if (this.shared !== undefined) {
      return;
    } else {
      this.shared = new TimberJ();
      this.shared.level = level;
    }
  }
  static tag(tag: string): TimberJBuilder {
    const builder = new TimberJBuilder();
    return builder.setTag(`[${tag}]`).setLevel(this.shared!.level);
  }
}

export {
  LEVEL_D,
  LEVEL_E,
  LEVEL_I,
  LEVEL_L,
  LEVEL_NOT_PLANTED,
  LEVEL_W,
  TimberJ,
};
