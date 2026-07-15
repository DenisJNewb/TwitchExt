import { findElementAsync } from "./common";

export const stopMainPlayerAsync = async (): Promise<void> => {
  const carouselDiv = await findElementAsync<HTMLDivElement>(
    "div.front-page-carousel",
    undefined,
    300,
    20,
  );

  const titleVideo = await findElementAsync<HTMLVideoElement>(
    "video",
    carouselDiv,
    300,
    20,
  );

  titleVideo.addEventListener("play", onPlay);
};

function onPlay(this: HTMLVideoElement) {
  const p = this;
  p.play().then(() => p.pause());
}
