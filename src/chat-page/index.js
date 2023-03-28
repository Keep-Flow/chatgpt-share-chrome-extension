console.log('chatGPT share extension is installed')

const installButtons = () => {
  // 按钮插入位置
  const container = document.querySelector(
    '.flex.ml-1.md\\:w-full.md\\:m-auto.md\\:mb-2.gap-0.md\\:gap-2.justify-center'
  )
  installShareImgButton(container)
  installShareJsonButton(container)
  installShareLinkButton(container)
  installShareCheckboxButton()
}

try {
  const debouncedInstallButtons = debounce(installButtons, 1000)

  // 创建一个 MutationObserver 实例
  const observer = new MutationObserver((mutations) => {
    // 检查是否有新的节点添加到页面上
    debouncedInstallButtons()
  })

  // 开始监听页面主体的变化
  observer.observe(document.body, { childList: true, subtree: true })
} catch (error) {
  console.log('error:', error)
}
