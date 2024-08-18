import { findElementAsync, log } from "./common";

let buttonsPanelElement: HTMLDivElement | null;
let buttonObserverTimeout: number | undefined;
const min1 = 1000 * 60;
const min15 = min1 * 15;

export const reinitButtonObserverAsync = async (): Promise<void> => {
  buttonsPanelElement = await findElementAsync<HTMLDivElement>(
    "div.chat-input__buttons-container"
  );

  if (!buttonsPanelElement)
    throw new Error("Cannot init button observer. buttons panel doesnt found");

  log("buttons panel initialized");
};

const findButton = (): HTMLButtonElement | undefined => {
  if (!buttonsPanelElement)
    throw new Error("Cannot find button. buttons panel is null");

  const buttons = [...buttonsPanelElement.querySelectorAll("button")];

  const button = buttons.find((b) =>
    b.className.includes("ScCoreButtonSuccess")
  );

  return button;
};

export const runButtonObserver = (): void => {
  if (buttonObserverTimeout) clearTimeout(buttonObserverTimeout);

  const button = findButton();

  if (!button) {
    buttonObserverTimeout = setTimeout(runButtonObserver, min1);
    log("button missing");
  } else {
    button.click();
    buttonObserverTimeout = setTimeout(runButtonObserver, min15);
    log("button used");
  }
};
