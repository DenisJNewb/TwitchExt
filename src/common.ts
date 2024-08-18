export const log = (msg: string): void => {
  console.log(new Date().toLocaleTimeString(), msg);
};

export const delayAsync = async (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
};

export async function findElementAsync<T extends HTMLElement>(
  selector: string,
  parentElement?: HTMLElement,
  delayMS: number = 1000,
  tryCount: number = 10
): Promise<T | null> {
  const parent = parentElement ?? document;

  for (let i = 0; i < tryCount; i++) {
    const element = parent.querySelector(selector) as T | null;
    if (element != null) return element;
    await delayAsync(delayMS);
  }

  return null;
}
