const getDate = (): string => new Date().toLocaleTimeString("ru-RU");

export const log = (msg: string): void => {
  console.log(getDate(), msg);
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
  tryCount: number = 10
): Promise<T> {
  const parent = parentElement ?? document;

  for (let i = 0; i < tryCount; i++) {
    const element = parent.querySelector<T>(selector);
    if (element != null) return element;
    await delayAsync(delayMS);
  }

  throw new Error(`Cannot find ${selector}`);
}
