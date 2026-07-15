const getDate = (): string => new Date().toLocaleTimeString("ru-RU");

export const sec2 = 1000 * 2;
export const min1 = 1000 * 60;
export const min15 = min1 * 15;

export const log = (msg: string): void => {
  console.log(getDate(), msg);
};

export const logElement = (obj: object | undefined): void => {
  console.log(getDate(), obj);
};

export const logError = (error: unknown): void => {
  console.error(getDate(), (error as Error).message);
};

export const delayAsync = async (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
};

export async function findElementAsync<T extends HTMLElement>(
  selector: string,
  parentElement?: HTMLElement,
  delayMS: number = 1000,
  tryCount: number = 10,
): Promise<T> {
  const parent = parentElement ?? document;

  for (let i = 0; i < tryCount; i++) {
    const element = parent.querySelector<T>(selector);
    if (element != null) return element;
    await delayAsync(delayMS);
  }

  throw new Error(`Cannot find ${selector}`);
}

export async function findAllElementsAsync<T extends HTMLElement>(
  selector: string,
  parentElement?: HTMLElement,
  delayMS: number = 1000,
  tryCount: number = 10,
): Promise<NodeListOf<T> | undefined> {
  const parent = parentElement ?? document;

  for (let i = 0; i < tryCount; i++) {
    const elements = parent.querySelectorAll<T>(selector);
    if (elements.length > 0) return elements;
    await delayAsync(delayMS);
  }

  return undefined;
}
