import {
  delayAsync,
  findAllElementsAsync,
  findElementAsync,
  log,
  sec2,
} from "./common";

let videoElement: HTMLVideoElement;
let observerInterval: number;
let currentTime: number = 0;
let volume: number = 0;
let muted: boolean = false;

export const reloadVideoAsync = async (): Promise<void> => {
  videoElement = await findElementAsync<HTMLVideoElement>("video");

  for (let i = 0; i < 10; i++) {
    if (videoElement.currentTime < currentTime) {
      videoElement.currentTime = currentTime;
      videoElement.volume = volume;
      videoElement.muted = muted;
      log(
        `Set video ${videoElement.currentTime}(${currentTime}) ${videoElement.volume}(${volume}) ${videoElement.muted}(${muted})`,
      );
    }
    await delayAsync(200);
  }

  if (observerInterval) clearInterval(observerInterval);

  observerInterval = setInterval(() => {
    if (videoElement.currentTime < 1) return;
    currentTime = videoElement.currentTime;
    volume = videoElement.volume;
    muted = videoElement.muted;
  }, sec2);

  videoElement.onerror = onError;
  log("video keeper run");
};

const onError = async () => {
  log(`Error accured [Time ${currentTime} Volume ${volume} Muted ${muted}]`);
  const parent = videoElement.parentElement as HTMLDivElement;
  let buttons: NodeListOf<HTMLButtonElement> | undefined;

  for (let i = 0; i < 10; i++) {
    buttons = await findAllElementsAsync<HTMLButtonElement>("button", parent);

    if (buttons != undefined && buttons.length > 0) {
      const reloadButton = [...buttons].find((b) =>
        b.innerText.toLowerCase().startsWith("click here to reload player"),
      );
      if (reloadButton) {
        reloadButton.click();
        break;
      }
    }

    await delayAsync(200);
  }

  reloadVideoAsync();
};
