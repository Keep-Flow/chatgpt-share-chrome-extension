interface JsonNode {
  tag: string
  text?: string
  children?: JsonNode[]
}

interface Conversation {
  author: string
  type: string
  avatar?: string
  text?: string
  children?: JsonNode[]
}

// 使用深度优先搜索将 DOM 节点转换为 JSON 对象
const convertContentToJson = (dom: HTMLElement): JsonNode => {
  const json: JsonNode = {
    tag: dom.tagName,
    text: dom.innerText,
    children: [],
  }

  if (json.tag === 'PRE') {
    const code = dom.querySelector('code')
    const language =
      Array.from(code?.classList || [])
        .find((item) => item.startsWith('language-'))
        ?.replace('language-', '') || ''
    const text = code?.textContent || ''
    const codeText = '```' + language + '\n' + text + '```'

    json.text = codeText
    delete json.children
    return json
  }

  for (const child of Array.from(dom.children)) {
    if (child instanceof HTMLElement) {
      json.children?.push(convertContentToJson(child));
    }
  }

  if (!json.children || !json.children.length) delete json.children;
  return json;
}

// 定义一个函数，将 DOM 节点转换为 JSON 对象
const convertDomToJson = (): Conversation[] => {
  const checkedChats = getCheckedChatNodes()
  const conversation: Conversation[] = []

  for (const singleChat of checkedChats) {
    const type = singleChat.classList.contains('dark:bg-gray-800')
      ? 'question'
      : 'answer'

      const contentEl = singleChat.querySelector('.min-h-\\[20px\\]');
      if (!contentEl || !(contentEl instanceof HTMLElement)) continue;

    // 分内容类型
    if (type === 'question') {
      const avatarEl = singleChat.querySelector(
        '.w-\\[30px\\] img.rounded-sm'
      ) as HTMLImageElement
      const userName = avatarEl?.alt || 'User'
      // NOTE this src maybe need permission
      const avatar = avatarEl?.src || ''

      conversation.push({
        author: userName,
        avatar,
        type,
        text: contentEl.innerText,
      })
    } else {
      const markdownEl = contentEl.querySelector('.markdown');
      if (markdownEl && markdownEl instanceof HTMLElement) {
        const children = convertContentToJson(markdownEl).children;
        conversation.push({
          author: 'ChatGPT',
          type,
          children,
        });
      }
    }
  }

  return conversation
}

// 保存 JSON 对象到本地
const saveJson = (json: object, fileName: string): void => {
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
  const json = convertDomToJson()
  removeCheckboxesFromNodes()
  console.log('Share Chats JSON:', json)
  saveJson(json, 'chats.json')
}

const createJsonButton = () => {
  const button = document.createElement('button')
  button.id = 'export-json-button'
  button.className = 'btn relative btn-neutral border-0 md:border'
  button.innerHTML =
    '<div class="flex w-full items-center justify-center gap-2"><svg class="h-3 w-3" fill="currentColor" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M213.333333 128h85.333334v85.333333H213.333333v213.333334a85.333333 85.333333 0 0 1-85.333333 85.333333 85.333333 85.333333 0 0 1 85.333333 85.333333v213.333334h85.333334v85.333333H213.333333c-45.653333-11.52-85.333333-38.4-85.333333-85.333333v-170.666667a85.333333 85.333333 0 0 0-85.333333-85.333333H0v-85.333334h42.666667a85.333333 85.333333 0 0 0 85.333333-85.333333V213.333333a85.333333 85.333333 0 0 1 85.333333-85.333333m597.333334 0a85.333333 85.333333 0 0 1 85.333333 85.333333v170.666667a85.333333 85.333333 0 0 0 85.333333 85.333333h42.666667v85.333334h-42.666667a85.333333 85.333333 0 0 0-85.333333 85.333333v170.666667a85.333333 85.333333 0 0 1-85.333333 85.333333h-85.333334v-85.333333h85.333334v-213.333334a85.333333 85.333333 0 0 1 85.333333-85.333333 85.333333 85.333333 0 0 1-85.333333-85.333333V213.333333h-85.333334V128h85.333334m-298.666667 512a42.666667 42.666667 0 0 1 42.666667 42.666667 42.666667 42.666667 0 0 1-42.666667 42.666666 42.666667 42.666667 0 0 1-42.666667-42.666666 42.666667 42.666667 0 0 1 42.666667-42.666667m-170.666667 0a42.666667 42.666667 0 0 1 42.666667 42.666667 42.666667 42.666667 0 0 1-42.666667 42.666666 42.666667 42.666667 0 0 1-42.666666-42.666666 42.666667 42.666667 0 0 1 42.666666-42.666667m341.333334 0a42.666667 42.666667 0 0 1 42.666666 42.666667 42.666667 42.666667 0 0 1-42.666666 42.666666 42.666667 42.666667 0 0 1-42.666667-42.666666 42.666667 42.666667 0 0 1 42.666667-42.666667z"></path></svg></div>'

  return button
}

const listenJsonButton = (button: HTMLElement) => {
  button.addEventListener('click', () => {
    export2Json()
  })
}

export const installShareJsonButton = (container: HTMLElement) => {
  if (document.getElementById('export-json-button')) return
  const button = createJsonButton()
  listenJsonButton(button)
  container?.appendChild(button)
}
