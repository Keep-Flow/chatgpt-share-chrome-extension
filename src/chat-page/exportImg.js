const createImgButton = () => {
  const button = document.createElement('button')
  button.className = 'btn relative btn-neutral border-0 md:border'
  button.innerHTML =
    '<div class="flex w-full items-center justify-center gap-2"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="#FFF"><path d="M736 448c53 0 96-43 96-96 0-53-43-96-96-96-53 0-96 43-96 96C640 405 683 448 736 448z"></path><path d="M904 128 120 128c-31.2 0-56 25.4-56 56.6l0 654.8c0 31.2 24.8 56.6 56 56.6l784 0c31.2 0 56-25.4 56-56.6L960 184.6C960 153.4 935.2 128 904 128zM697.8 523.4c-6-7-15.2-12.4-25.6-12.4-10.2 0-17.4 4.8-25.6 11.4l-37.4 31.6c-7.8 5.6-14 9.4-23 9.4-8.6 0-16.4-3.2-22-8.2-2-1.8-5.6-5.2-8.6-8.2L448 430.6c-8-9.2-20-15-33.4-15-13.4 0-25.8 6.6-33.6 15.6L128 736.4 128 215.4c2-13.6 12.6-23.4 26.2-23.4l715.4 0c13.8 0 25 10.2 25.8 24l0.6 520.8L697.8 523.4z"></path></svg>Export Image</div>'

  return button
}

const listenImgButton = (button) => {
  button.addEventListener('click', () => {
    // 截图区域
    // TODO checkbox 选区拼合
    // TOFIX 图片过长时会丢内容
    const targetNode = document.querySelector(
      '.flex.flex-col.items-center.text-sm.dark\\:bg-gray-800'
    )

    html2canvas(targetNode).then((canvas) => {
      const imgDataUrl = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = imgDataUrl
      link.download = 'capture.png'
      link.click()
    })
  })
}

const installShareImgButton = (container) => {
  const button = createImgButton()
  listenImgButton(button)
  container?.appendChild(button)
}