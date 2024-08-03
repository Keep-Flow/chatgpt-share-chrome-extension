/**
 * 防抖函数
 * 在 n 秒内函数只能执行一次，如果触发事件后在 n 秒内又触发了事件，则会重新计算函数延执行时间。
 * @param func 需要执行的函数
 * @param wait 延迟执行时间（毫秒）
 * @param immediate true 表立即执行，false 表非立即执行
 **/
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate: boolean
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null;

  return function (this: unknown, ...args: Parameters<T>) {
    const context = this;

    if (timer) clearTimeout(timer);

    if (immediate) {
      const callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);

      if (callNow) func.apply(context, args);
    } else {
      timer = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  };
}
