const CONTROL_CHECKBOX_BUTTON_ID = 'show-checkbox-button' // 开启选择按钮
const SELECT_ALL_CHECKBOX = 'select-all-checkbox' // 全选按钮

/**
 * 创建一个复选框元素
 * @param {string} name - 复选框的名称
 * @param {string} className - CSS类名
 * @returns {HTMLInputElement} - 创建的复选框元素
 */
const createCheckbox = (
  name: string,
  className: string,
  id?: string
): HTMLInputElement => {
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.name = name
  checkbox.className = className
  if (id) checkbox.id = id

  return checkbox
}

const createCheckAllButton = (): HTMLLabelElement => {
  const selectAllLabel = document.createElement('label')
  const labelText = document.createElement('span')
  labelText.innerText = '全选'
  selectAllLabel.className = SELECT_ALL_CHECKBOX
  selectAllLabel.append(labelText)
  const selectAllCheckbox = createCheckbox('', 'share-checkbox-all')

  // 监听全选复选框的点击事件
  selectAllLabel.addEventListener('click', () => {
    const isChecked = selectAllCheckbox.checked
    const shareCheckboxes = document.querySelectorAll(
      '.share-checkbox'
    ) as unknown as HTMLInputElement[]

    labelText.textContent = isChecked ? '取消全选' : '全选'

    // 设置所有复选框的选中状态与全选复选框相同
    shareCheckboxes.forEach((checkbox) => (checkbox.checked = isChecked))
  })

  selectAllLabel.append(selectAllCheckbox)

  return selectAllLabel
}

/**
 * 用新元素替换聊天节点
 * @param {Element} node - 要替换的节点
 * @param {string} newTag - 新元素的标签
 * @returns {Element} - 新创建的元素
 */
const replaceNodeWithTag = (node: Element, newTag: string): Element => {
  const newNode = document.createElement(newTag)
  newNode.append(...node.childNodes)
  newNode.className = node.className
  node.replaceWith(newNode)
  return newNode
}

/**
 * 添加复选框到聊天节点
 */
const addCheckboxesToNodes = (): void => {
  const chatNodes = document.querySelectorAll('main div.group')

  // 全选功能
  const headerNode = chatNodes[0].parentElement!.firstChild
  const selectAllLabel = createCheckAllButton()

  // 将全选复选框添加到头部节点
  headerNode!.before(selectAllLabel)

  // 遍历每个聊天节点
  chatNodes.forEach((node, index) => {
    const label = replaceNodeWithTag(node, 'label')
    const name = 'share'
    const id = `${name}-${index}`
    const checkbox = createCheckbox(name, 'share-checkbox', id)
    label.setAttribute('for', id)

    // 将复选框添加到label中
    label.before(checkbox)
  })
}

/**
 * 移除聊天节点的复选框
 */
const removeCheckboxesFromNodes = () => {
  const checkboxes = document.querySelectorAll('.share-checkbox')
  const selectAll = document.querySelector(`.${SELECT_ALL_CHECKBOX}`)

  // 如果存在复选框，则进行移除操作
  if (checkboxes.length || selectAll) {
    checkboxes.forEach((checkbox) => {
      const label = checkbox.nextElementSibling
      if (!label) return
      // 用div替换label
      replaceNodeWithTag(label, 'div')
      // 移除 for 属性
      label.removeAttribute('for')
      // 移除复选框
      checkbox.remove()
    })

    // 移除全选复选框
    selectAll?.remove()
  }
}

/**
 * @description 创建生成复选框按钮
 * @returns
 */
const createControlCheckboxButton = () => {
  const button = document.createElement('button')
  button.id = CONTROL_CHECKBOX_BUTTON_ID
  button.className = 'btn relative btn-neutral border-0 md:border'
  button.innerHTML =
    '<div class="flex w-full items-center justify-center gap-2"><svg class="h-3 w-3" fill="currentColor" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M936.5 213.1H360.1c-12.7 0-23-10.3-23-23s10.3-23 23-23h576.5c12.7 0 23 10.3 23 23s-10.3 23-23.1 23zM163.1 270c-6.1 0-12-2.4-16.3-6.7L73.5 190c-9-9-9-23.5 0-32.5s23.5-9 32.5 0l57 57 109.7-109.7c9-9 23.5-9 32.5 0s9 23.5 0 32.5L179.3 263.2c-4.3 4.3-10.1 6.8-16.2 6.8zM360.1 535.3c-12.7 0-23-10.3-23-23s10.3-23 23-23l576.5-0.5c12.7 0 23 10.3 23 23s-10.3 23-23 23l-576.5 0.5zM163.1 592.4c-6.1 0-11.9-2.4-16.3-6.7l-73.3-73.2c-9-9-9-23.5 0-32.5s23.5-9 32.5 0l57.1 57 109.6-109.8c9-9 23.5-9 32.5 0s9 23.5 0 32.5l-125.8 126c-4.3 4.2-10.2 6.7-16.3 6.7z"></path><path d="M936.5 868H360.1c-12.7 0-23-10.3-23-23s10.3-23 23-23h576.5c12.7 0 23 10.3 23 23s-10.3 23-23.1 23zM163.1 924.9c-6.1 0-12-2.4-16.3-6.7l-73.3-73.3c-9-9-9-23.5 0-32.5s23.5-9 32.5 0l57 57 109.7-109.7c9-9 23.5-9 32.5 0s9 23.5 0 32.5L179.3 918.1c-4.3 4.4-10.1 6.8-16.2 6.8z"></path></svg></div>'

  return button
}

const listenControlCheckboxButton = (button: HTMLButtonElement): void => {
  button.addEventListener('click', () => {
    const checkboxAll = document.querySelector(`.${SELECT_ALL_CHECKBOX}`)
    if (checkboxAll) removeCheckboxesFromNodes()
    else addCheckboxesToNodes()
  })
}

// 安装复选框按钮
const installShareCheckboxButton = (): void => {
  if (document.getElementById(CONTROL_CHECKBOX_BUTTON_ID)) return
  const button = createControlCheckboxButton()
  listenControlCheckboxButton(button)
  document.body.appendChild(button)
}

// 隐藏复选框按钮
const hideShareCheckboxButton = (): void => {
  const checkboxButton = document.getElementById(CONTROL_CHECKBOX_BUTTON_ID) as HTMLElement | null;
  const checkboxAll = document.querySelector<HTMLElement>(`.${SELECT_ALL_CHECKBOX}`);
  const checkboxes = document.querySelectorAll<HTMLElement>('.share-checkbox');

  if (checkboxButton) checkboxButton.style.display = 'none';
  if (checkboxAll) checkboxAll.style.display = 'none';
  checkboxes.forEach((checkbox) => {
    checkbox.style.display = 'none';
  });
};


// 计算头部节点
const getHeaderNode = (): ChildNode | null => {
  const checkboxAll = document.querySelector(`.${SELECT_ALL_CHECKBOX}`)
  return checkboxAll?.nextSibling ?? null
}

// 计算选中的聊天节点
const getCheckedChatNodes = (): HTMLElement[] => {
  const checkboxes = document.querySelectorAll<HTMLInputElement>(
    '.share-checkbox:checked'
  )

  if (!checkboxes.length) {
    return Array.from(document.querySelectorAll<HTMLElement>('main .group'))
  }

  const chatNodes: HTMLElement[] = []
  checkboxes.forEach((checkbox) => {
    const label = checkbox.nextSibling as HTMLElement
    chatNodes.push(label)
  })
  return chatNodes
}
