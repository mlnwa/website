export { IdUtil } from './IdUtil';
export { TypeUtil } from './TypeUtil';
export { DateUtil } from './DateUtil';

export const IDebounce = <T extends (...args: any[]) => any>(
  fn: T,
  wait: number,
  immediate: boolean = false,
): ((...args: Parameters<T>) => void) => {
  let timer: NodeJS.Timeout | null;
  let startTimeStamp = 0;
  let context: any;
  let args: any;

  let run = (timerInterval: number) => {
    timer = setTimeout(() => {
      let now = Date.now();
      let interval = now - startTimeStamp;
      if (interval < timerInterval) {
        startTimeStamp = now;
        run(wait - interval);
      } else {
        if (!immediate) {
          fn.apply(context, args);
        }
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
      }
    }, timerInterval);
  };

  return function (this: any, ...innerArgs: Parameters<T>): void {
    context = this;
    args = innerArgs;
    let now = Date.now();
    startTimeStamp = now;

    if (!timer) {
      if (immediate) {
        fn.apply(context, args);
      }
      run(wait);
    }
  };
};
