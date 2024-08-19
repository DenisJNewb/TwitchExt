import { logError } from "./common";
import { startTitleObserver } from "./titleObs";
import { startButtonObserver } from "./useButton";

setTimeout(async () => {
  try {
    await startButtonObserver();
  } catch (error) {
    logError(error);
  }

  startTitleObserver(startButtonObserver);
});
