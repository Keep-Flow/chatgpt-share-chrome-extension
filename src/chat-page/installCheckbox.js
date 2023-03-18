/**
 * 创建一个复选框元素
 * @param {string} type - input类型
 * @param {string} name - 复选框的名称
 * @param {string} className - CSS类名
 * @returns {HTMLInputElement} - 创建的复选框元素
 */
const createCheckbox = (type, name, className) => {
  const checkbox = document.createElement('input')
  checkbox.type = type
  checkbox.name = name
  checkbox.className = className
  return checkbox
}

/**
 * 用新元素替换聊天节点
 * @param {Element} node - 要替换的节点
 * @param {string} newTag - 新元素的标签
 * @returns {Element} - 新创建的元素
 */
const replaceNodeWithTag = (node, newTag) => {
  const newNode = document.createElement(newTag)
  newNode.append(...node.childNodes)
  newNode.className = node.className
  node.replaceWith(newNode)
  return newNode
}

/**
 * 添加复选框到聊天节点
 */
const addCheckboxesToNodes = () => {
  const chatNodes = document.querySelectorAll('main div.group')

  // 全选功能
  const headerNode = chatNodes[0].parentElement.firstChild
  const selectAllCheckbox = createCheckbox('checkbox', '', 'share-checkbox-all')

  // 监听全选复选框的点击事件
  selectAllCheckbox.addEventListener('click', () => {
    const isChecked = selectAllCheckbox.checked
    const shareCheckboxes = document.querySelectorAll('.share-checkbox')

    // 设置所有复选框的选中状态与全选复选框相同
    shareCheckboxes.forEach((checkbox) => (checkbox.checked = isChecked))
  })

  // 将全选复选框添加到头部节点
  headerNode.prepend(selectAllCheckbox)

  // 遍历每个聊天节点
  chatNodes.forEach((node) => {
    const label = replaceNodeWithTag(node, 'label')
    const checkbox = createCheckbox('checkbox', 'share', 'share-checkbox')

    // 将复选框添加到label中
    label.prepend(checkbox)
  })
}

/**
 * 移除聊天节点的复选框
 */
const removeCheckboxesFromNodes = () => {
  const checkboxes = document.querySelectorAll('.share-checkbox')
  const checkboxAll = document.querySelector('.share-checkbox-all')

  console.log('checkboxes', checkboxes)

  // 如果存在复选框，则进行移除操作
  if (checkboxes.length || checkboxAll) {
    checkboxes.forEach((checkbox) => {
      const label = checkbox.parentElement
      // 用div替换label
      replaceNodeWithTag(label, 'div')
      // 移除复选框
      checkbox.remove()
    })

    // 移除全选复选框
    checkboxAll?.remove()
  }
}

/**
 * @description 创建生成复选框按钮
 * @returns
 */
const createCheckboxButton = () => {
  const button = document.createElement('button')
  button.id = 'checkbox-button'
  button.className = 'btn relative btn-neutral border-0 md:border'
  button.innerHTML =
    '<div class="flex w-full items-center justify-center gap-2"><svg class="h-3 w-3" fill="currentColor" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M936.5 213.1H360.1c-12.7 0-23-10.3-23-23s10.3-23 23-23h576.5c12.7 0 23 10.3 23 23s-10.3 23-23.1 23zM163.1 270c-6.1 0-12-2.4-16.3-6.7L73.5 190c-9-9-9-23.5 0-32.5s23.5-9 32.5 0l57 57 109.7-109.7c9-9 23.5-9 32.5 0s9 23.5 0 32.5L179.3 263.2c-4.3 4.3-10.1 6.8-16.2 6.8zM360.1 535.3c-12.7 0-23-10.3-23-23s10.3-23 23-23l576.5-0.5c12.7 0 23 10.3 23 23s-10.3 23-23 23l-576.5 0.5zM163.1 592.4c-6.1 0-11.9-2.4-16.3-6.7l-73.3-73.2c-9-9-9-23.5 0-32.5s23.5-9 32.5 0l57.1 57 109.6-109.8c9-9 23.5-9 32.5 0s9 23.5 0 32.5l-125.8 126c-4.3 4.2-10.2 6.7-16.3 6.7z"></path><path d="M936.5 868H360.1c-12.7 0-23-10.3-23-23s10.3-23 23-23h576.5c12.7 0 23 10.3 23 23s-10.3 23-23.1 23zM163.1 924.9c-6.1 0-12-2.4-16.3-6.7l-73.3-73.3c-9-9-9-23.5 0-32.5s23.5-9 32.5 0l57 57 109.7-109.7c9-9 23.5-9 32.5 0s9 23.5 0 32.5L179.3 918.1c-4.3 4.4-10.1 6.8-16.2 6.8z"></path></svg></div>'

  return button
}

const listenCheckboxButton = (button) => {
  button.addEventListener('click', () => {
    const checkboxAll = document.querySelector('.share-checkbox-all')
    if (checkboxAll) removeCheckboxesFromNodes()
    else addCheckboxesToNodes()
  })
}

const installShareCheckboxButton = () => {
  if (document.getElementById('checkbox-button')) return
  const button = createCheckboxButton()
  listenCheckboxButton(button)
  document.body.appendChild(button)
}
