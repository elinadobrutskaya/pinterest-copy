import { boards, saveBoards } from '../states/storage.js'

export function renderBoardsList() {
  const list = document.getElementById('boards-list')
  if (!list) return

  list.innerHTML = ''

  boards.forEach((board) => {
    const item = document.createElement('div')
    item.className = 'board-item'
    item.dataset.id = board.id

    const title = document.createElement('span')
    title.textContent = board.title
    title.className = 'board-link'

    const delBtn = document.createElement('button')
    delBtn.className = 'delete-board'
    delBtn.textContent = '✖'
    delBtn.dataset.id = board.id

    item.append(title, delBtn)
    list.append(item)
  })
}

export function addBoard(title) {
  const board = {
    id: Date.now(),
    title,
    cards: [],
  }

  boards.push(board)
  saveBoards()
  renderBoardsList()
}
