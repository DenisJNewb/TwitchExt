import { runTitleObserver } from "./titleObs";
import { reinitButtonObserverAsync, runButtonObserver } from "./useButton";

setTimeout(async () => {
  await reinitButtonObserverAsync();

  runTitleObserver(async () => {
    await reinitButtonObserverAsync();
    runButtonObserver();
  });

  runButtonObserver();
});
