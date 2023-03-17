console.log('chatGPT share extension is installed')

try {
  setTimeout(() => {
    // 按钮插入位置
    const container = document.querySelector(
      '.flex.ml-1.md\\:w-full.md\\:m-auto.md\\:mb-2.gap-0.md\\:gap-2.justify-center'
    )
    installShareImgButton(container)
    // installShareLinkButton(container)
  }, 3000)
} catch (error) {
  console.log('error:', error)
}
