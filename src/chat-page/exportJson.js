/**
 * 使用深度优先搜索
 * 将 DOM 节点转换为 JSON 对象
 * 包含 tag / text / children 字段
 * @param {HTMLElement} dom
 * @returns {JSON}
 */
const convertContentToJson = (dom) => {
  const json = {
    tag: dom.tagName,
    text: dom.innerText,
    children: [],
  }

  if (tag === 'PRE') {
    const code = dom.querySelector('code')
    const language =
      Array.from(code.classList)
        .find((item) => item.startsWith('language-'))
        ?.replace('language-', '') || ''
    const text = code?.textContent || ''
    const codeText = '```' + language + '\n' + text + '```'

    text = codeText
    delete json.children
    return json
  }

  for (const child of dom.children) {
    json.children.push(convertContentToJson(child))
    if (!json.children.length) delete json.children
  }

  return json
}

// 定义一个函数，将 DOM 节点转换为 JSON 对象
const convertDomToJson = (dom) => {
  const checkboxes = dom.querySelectorAll('.share-checkbox:checked')
  const checkedChats = checkboxes.map(
    (checkbox) => checkbox.parentElement
  )

  if (!checkedChats.length) checkedChats = dom.getElementsByClassName('group')

  const conversation = []

  for (const singleChat of checkedChats) {
    const type = singleChat.classList.contains('dark:bg-gray-800')
      ? 'question'
      : 'answer'

    const contentEl = singleChat.querySelector('.min-h-\\[20px\\]')

    console.log('contentEl', contentEl)

    // 分内容类型
    let children

    if (type === 'question') {
      children = contentEl.innerText
    } else {
      const markdownEl = contentEl.querySelector('.markdown')
      children = convertContentToJson(markdownEl).children
    }

    conversation.push({
      type,
      children,
    })
  }

  return conversation
}

// 保存 JSON 对象到本地
const saveJson = (json, fileName) => {
  const jsonString = JSON.stringify(json)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.click()
}

/**
 * 将对话转换为 JSON
 */
const export2Json = () => {
  const conversationWrapper = document.querySelector(
    '.flex.flex-col.items-center.text-sm.dark\\:bg-gray-800'
  )

  const json = convertDomToJson(conversationWrapper)
  console.log(json)

  // saveJson(json, 'chats.json')
}

const createJsonButton = () => {
  const button = document.createElement('button')
  button.id = 'export-json-button'
  button.className = 'btn relative btn-neutral border-0 md:border'
  button.innerHTML =
    '<div class="flex w-full items-center justify-center gap-2"><svg class="h-3 w-3" fill="currentColor" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M213.333333 128h85.333334v85.333333H213.333333v213.333334a85.333333 85.333333 0 0 1-85.333333 85.333333 85.333333 85.333333 0 0 1 85.333333 85.333333v213.333334h85.333334v85.333333H213.333333c-45.653333-11.52-85.333333-38.4-85.333333-85.333333v-170.666667a85.333333 85.333333 0 0 0-85.333333-85.333333H0v-85.333334h42.666667a85.333333 85.333333 0 0 0 85.333333-85.333333V213.333333a85.333333 85.333333 0 0 1 85.333333-85.333333m597.333334 0a85.333333 85.333333 0 0 1 85.333333 85.333333v170.666667a85.333333 85.333333 0 0 0 85.333333 85.333333h42.666667v85.333334h-42.666667a85.333333 85.333333 0 0 0-85.333333 85.333333v170.666667a85.333333 85.333333 0 0 1-85.333333 85.333333h-85.333334v-85.333333h85.333334v-213.333334a85.333333 85.333333 0 0 1 85.333333-85.333333 85.333333 85.333333 0 0 1-85.333333-85.333333V213.333333h-85.333334V128h85.333334m-298.666667 512a42.666667 42.666667 0 0 1 42.666667 42.666667 42.666667 42.666667 0 0 1-42.666667 42.666666 42.666667 42.666667 0 0 1-42.666667-42.666666 42.666667 42.666667 0 0 1 42.666667-42.666667m-170.666667 0a42.666667 42.666667 0 0 1 42.666667 42.666667 42.666667 42.666667 0 0 1-42.666667 42.666666 42.666667 42.666667 0 0 1-42.666666-42.666666 42.666667 42.666667 0 0 1 42.666666-42.666667m341.333334 0a42.666667 42.666667 0 0 1 42.666666 42.666667 42.666667 42.666667 0 0 1-42.666666 42.666666 42.666667 42.666667 0 0 1-42.666667-42.666666 42.666667 42.666667 0 0 1 42.666667-42.666667z"></path></svg></div>'

  return button
}

const listenJsonButton = (button) => {
  button.addEventListener('click', () => {
    export2Json()
  })
}

const installShareJsonButton = (container) => {
  if (document.getElementById('export-json-button')) return
  const button = createJsonButton()
  listenJsonButton(button)
  container?.appendChild(button)
}
