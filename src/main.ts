import { logError } from "./common";
import { stopMainPlayerAsync } from "./main-page";
import { reloadVideoAsync } from "./reload-video";
import { startTitleObserver } from "./titleObs";
import { startButtonObserverAsync } from "./useButton";

const siteUrl = "https://www.twitch.tv/";
const videoUrl = "https://www.twitch.tv/videos/";

const resetAsync = async (): Promise<void> => {
  try {
    if (document.URL == siteUrl) {
      await stopMainPlayerAsync();
    } else if (document.URL.startsWith(videoUrl)) {
      await reloadVideoAsync();
    } else {
      await startButtonObserverAsync();
    }
  } catch (e) {
    logError(e);
  }
};

setTimeout(async () => {
  await resetAsync();
  startTitleObserver(resetAsync);
});
