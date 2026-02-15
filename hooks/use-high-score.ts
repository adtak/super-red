import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const HIGH_SCORE_KEY = "highScore_v2";

/**
 * Reads the stored high score and updates it if the current score is higher.
 * Returns the best score and whether the current run is a new record.
 */
export function useHighScore(currentScore: string) {
  const [highScore, setHighScore] = useState<string | null>(null);
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  useEffect(() => {
    async function checkHighScore() {
      const stored = await AsyncStorage.getItem(HIGH_SCORE_KEY);
      const current = Number.parseInt(currentScore, 10);

      if (Number.isNaN(current)) {
        setHighScore(stored);
        return;
      }

      const storedValue = stored ? Number.parseInt(stored, 10) : null;

      if (storedValue === null || current > storedValue) {
        await AsyncStorage.setItem(HIGH_SCORE_KEY, currentScore);
        setHighScore(currentScore);
        setIsNewHighScore(true);
      } else {
        setHighScore(stored);
      }
    }

    checkHighScore();
  }, [currentScore]);

  return { highScore, isNewHighScore };
}
