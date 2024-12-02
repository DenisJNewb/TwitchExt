import { logError } from "./common";
import { stopMainPlayerAsync } from "./main-page";
import { startTitleObserver } from "./titleObs";
import { startButtonObserverAsync } from "./useButton";

const resetAsync = async (): Promise<void> => {
  const startObsButtonPromise = startButtonObserverAsync();
  const stopPlayerPromise = stopMainPlayerAsync();

  try {
    await startObsButtonPromise;
  } catch (e) {
    logError(e);
  }

  try {
    await stopPlayerPromise;
  } catch (e) {
    logError(e);
  }
};

setTimeout(async () => {
  await resetAsync();
  startTitleObserver(resetAsync);
});
