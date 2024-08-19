import { findElementAsync, log } from "./common";

let buttonsPanelElement: HTMLDivElement;
let buttonObserverTimeout: number;
const min1 = 1000 * 60;
const min15 = min1 * 15;

export const startButtonObserver = async (): Promise<void> => {
  await reinitButtonObserverAsync();
  runButtonObserver();
};

const reinitButtonObserverAsync = async (): Promise<void> => {
  buttonsPanelElement = await findElementAsync<HTMLDivElement>(
    "div.chat-input__buttons-container"
  );

  log("buttons panel initialized");
};

const findButton = (): HTMLButtonElement | undefined => {
  const buttons = [...buttonsPanelElement.querySelectorAll("button")];

  const button = buttons.find((b) =>
    b.className.includes("ScCoreButtonSuccess")
  );

  return button;
};

const runButtonObserver = (): void => {
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
