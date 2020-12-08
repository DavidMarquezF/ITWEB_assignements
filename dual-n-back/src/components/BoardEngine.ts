export interface FlashModel {
  position: number;
  sound: number;
}

export const calculateNewScore = (
  score: number,
  level: number,
  isCorrect: boolean
): number => {
  return score + (isCorrect ? (level * 50) : (-50));
};
// Inspired by https://github.com/hindol/dual-n-back/blob/master/src/Game.tsx
export class BoardEngine {
  public static samePosition(level: number, history: FlashModel[]): boolean {
    return this.sameValue(level, history.map(h => h.position));
  }

  public static sameSound(level: number, history: FlashModel[]): boolean {
    return this.sameValue(level, history.map(h => h.sound));
  }

  private static sameValue(level: number, history: number[]) {
    if (
      history.length > level + 1 &&
      history[history.length - 1] === history[history.length - 1 - (level + 1)]
    ) {
      return true;
    } else {
      return false;
    }
  }

  public static next(history: FlashModel[]): FlashModel {
    const nextFlash: FlashModel = { position: -1, sound: -1 };
    const itemsInGrid = 3 * 3 - 1; // we subtract 1 because the center of the grid doesnt count
    const randomPos = this.randomInRange(0, itemsInGrid - 1);
    nextFlash.position = randomPos;

    const randomSound = this.randomInRange(0, itemsInGrid - 1);
    nextFlash.sound = randomSound;

    return nextFlash;
  }

  private static randomInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
