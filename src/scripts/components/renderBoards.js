import { Element } from '../lib/element.js'
import { getState, addBoard, removeBoard } from '../states/boardsStore.js'

export function renderBoardsList() {
  const list = document.getElementById('boards-list')
  if (!list) return

  const { boards } = getState()
  if (!Array.isArray(boards)) return

  list.innerHTML = ''

  boards.forEach((board) => {
    const item = new Element('div', {
      class: 'board-item',
      dataset: { id: board.id },
    })

    const title = new Element('span', {
      class: 'board-link',
      textContent: board.title,
    })

    const delBtn = new Element('button', {
      class: 'delete-board',
      textContent: '✖',
      dataset: { id: board.id },
    })

    item.append(title, delBtn)
    list.append(item)
  })
}

export function createBoard(title) {
  if (!title) return
  addBoard(title)
}
