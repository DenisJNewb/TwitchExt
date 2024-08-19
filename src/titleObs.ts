import { log } from "./common";

const pageTitleElement = document.querySelector("title");
let titleObserver: MutationObserver | null = null;
let titleChangeTimeout: number | null = null;

export const startTitleObserver = (onTitleChanged: () => void) => {
  if (!pageTitleElement) throw new Error("pageTitleElement is null");

  if (titleObserver != null) {
    titleObserver.disconnect();
    titleObserver = null;
    log("Old titleObserver killed");
  }

  titleObserver = new MutationObserver(() => {
    if (titleChangeTimeout) clearTimeout(titleChangeTimeout);
    titleChangeTimeout = setTimeout(() => {
      onTitleChanged();
    }, 10000);
  });

  titleObserver.observe(pageTitleElement, { childList: true });
  log("Started titleObserver");
};
