/**
 * @desc 防抖函数
 * @desc 在 n 秒内函数只能执行一次，如果触发事件后在 n 秒内又触发了事件，则会重新计算函数延执行时间。
 * @param  func 需要执行的函数
 * @param  wait 延迟执行时间（毫秒）
 * @param  immediate---true 表立即执行，false 表非立即执行
 **/
function debounce(func, wait, immediate) {
  let timer // 声明计时器
  return function () {
		let context = this
    // 如果已有计时器 重新计时
    if (timer) clearTimeout(timer)
    // 立即执行
    if (immediate) {
      // 如果已经执行过，不再执行
      var callNow = !timer // 没有计时器的时候响应
      timer = setTimeout(() => {
        timer = null
      }, wait)
      if (callNow) func.apply(context, arguments)
    } else {
      timer = setTimeout(() => {
        func.apply(this, arguments)
      }, wait)
    }
  }
}