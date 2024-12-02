import { logError } from "./common";
import { removeMainCarouselAsync } from "./main-carousel";
import { startTitleObserver } from "./titleObs";
import { startButtonObserverAsync } from "./useButton";

const resetAsync = async (): Promise<void> => {
  const startPromise = startButtonObserverAsync();
  const removePromise = removeMainCarouselAsync();

  try {
    await startPromise;
  } catch (e) {
    logError(e);
  }

  try {
    await removePromise;
  } catch (e) {
    logError(e);
  }
};

setTimeout(async () => {
  await resetAsync();
  startTitleObserver(resetAsync);
});
