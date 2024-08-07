const createLinkButton = () => {
  const button = document.createElement('button')
  button.id = 'export-link-button'
  button.className = 'btn relative btn-neutral border-0 md:border'
  button.innerHTML =
    '<div class="flex w-full items-center justify-center gap-2"><svg class="h-3 w-3" fill="currentColor" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M633.417143 429.007238a174.567619 174.567619 0 0 1 0 246.857143l-155.306667 155.306667a186.709333 186.709333 0 1 1-264.045714-264.045715l76.483048-76.507428 51.73638 51.736381-76.507428 76.507428a113.566476 113.566476 0 1 0 160.597333 160.597334l155.306667-155.306667a101.424762 101.424762 0 0 0 0-143.408762z m208.603428-225.816381a186.709333 186.709333 0 0 1 0 264.045714L765.561905 543.744l-51.736381-51.712 76.507428-76.507429a113.566476 113.566476 0 1 0-160.597333-160.597333l-155.306667 155.306667a101.424762 101.424762 0 0 0 0 143.408762l-51.736381 51.736381a174.567619 174.567619 0 0 1 0-246.857143l155.306667-155.306667a186.709333 186.709333 0 0 1 264.045714 0z"></path></svg></div>'

  return button
}

const listenLinkButton = (button: HTMLElement) => {
  button.addEventListener('click', () => {
    alert('TODO Share Link')
  })
}

export const installShareLinkButton = (container: HTMLElement) => {
  if (document.getElementById('export-link-button')) return
  const button = createLinkButton()
  listenLinkButton(button)
  container?.appendChild(button)
}