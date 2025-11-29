import { App } from './components/renderApp.js'
import { renderCards } from './components/renderCards.js'
import { addBoard, renderBoardsList } from './components/renderBoards.js'
import {
  boards,
  saveBoards,
  hiddenCards,
  saveHiddenCards,
} from './states/storage.js'

let cardsData = []

// Render App
const root = App()
document.querySelector('.ROOT').append(root)

// render boards on load
renderBoardsList()

// search
const inputSearch = document.getElementById('input-search')
inputSearch.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim()
  const filtered = cardsData.filter((c) =>
    c.desc?.toLowerCase().includes(query)
  )
  renderCards(filtered)
})

// load cards
async function loadCards() {
  try {
    const res = await fetch(
      'https://6921838a512fb4140be070b9.mockapi.io/api/cards'
    )
    const data = await res.json()
    cardsData = data.filter((card) => !hiddenCards.includes(card.id))

    renderCards(cardsData)
  } catch (err) {
    console.error('Load error:', err)
  }
}

// avatar + boards modal
const avatar = document.getElementById('avatar-wrap')
const modal = document.getElementById('boards-modal')

avatar.addEventListener('click', () => {
  modal.classList.toggle('open')
})

document.addEventListener('click', (e) => {
  if (!e.target.closest('.profile-link')) modal.classList.remove('open')
})

// open create board modal
document.addEventListener('click', (e) => {
  if (e.target.closest('.add-board-btn')) {
    modal.classList.remove('open')
    document.getElementById('create-board-backdrop').classList.add('open')
  }
})

// cancel create board
document.getElementById('create-board-cancel').addEventListener('click', () => {
  document.getElementById('create-board-backdrop').classList.remove('open')
})

// create board
document.getElementById('create-board-create').addEventListener('click', () => {
  const input = document.getElementById('create-board-input')
  const value = input.value.trim()

  if (value) {
    addBoard(value)
    input.value = ''
    document.getElementById('create-board-backdrop').classList.remove('open')
  }
})

//name of the board click
document.addEventListener('click', (e) => {
  const boardLink = e.target.closest('.board-link')
  if (boardLink) {
    const boardItem = boardLink.parentNode
    const id = boardItem.dataset.id
    window.location.href = `/board.html?id=${id}`
  }
})

// save card modal
document.addEventListener('click', (e) => {
  const saveBtn = e.target.closest('.save')

  if (saveBtn) {
    const wrap = saveBtn.parentNode
    const modal = wrap.querySelector('.save-to-board-modal')

    document.querySelectorAll('.save-to-board-modal').forEach((m) => {
      if (m !== modal) m.classList.remove('open')
    })

    modal.classList.toggle('open')
    fillSaveBoardList(modal.querySelector('.save-board-list'))

    return
  }

  if (!e.target.closest('.save-to-board-modal')) {
    document
      .querySelectorAll('.save-to-board-modal')
      .forEach((m) => m.classList.remove('open'))
  }
})

function fillSaveBoardList(container) {
  container.innerHTML = ''

  boards.forEach((board) => {
    const div = document.createElement('div')
    div.className = 'save-board-item'
    div.textContent = board.title
    div.dataset.id = board.id
    container.append(div)
  })
}

// save card to board
document.addEventListener('click', (e) => {
  const boardItem = e.target.closest('.save-board-item')
  if (boardItem) {
    const boardId = Number(boardItem.dataset.id)

    const card = e.target.closest('.card-wrap')
    const cardId = card.dataset.id

    saveCardToBoard(boardId, cardId)

    e.target.closest('.save-to-board-modal').classList.remove('open')

    card.querySelector('.save').classList.add('active')
  }
})

function saveCardToBoard(boardId, cardId) {
  const board = boards.find((b) => b.id === boardId)
  if (!board) return

  const cardObj = cardsData.find((c) => c.id == cardId)
  if (!cardObj) return
  if (!board.cards.some((c) => c.id == cardId)) {
    board.cards.push(cardObj)
  }

  saveBoards()
}

// create board from save-menu
document.addEventListener('click', (e) => {
  const newBoardBtn = e.target.closest('.save-new-board')
  if (newBoardBtn) {
    document.getElementById('boards-modal')?.classList.remove('open')
    document.getElementById('create-board-backdrop').classList.add('open')
  }
})

// delete board
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-board')) {
    const id = Number(e.target.dataset.id)

    const index = boards.findIndex((b) => b.id === id)
    if (index !== -1) boards.splice(index, 1)

    saveBoards()
    renderBoardsList()
  }
})

//report
let cardToReport = null

// open window
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.report')
  if (!btn) return

  const card = btn.closest('.card-wrap')
  cardToReport = card.dataset.id

  document.getElementById('report-backdrop').classList.add('open')
})

// close window
document.getElementById('report-cancel').addEventListener('click', () => {
  document.getElementById('report-backdrop').classList.remove('open')
})

// report agree
document.getElementById('report-ok').addEventListener('click', () => {
  const reason = document.querySelector('input[name="report"]:checked')

  if (!reason) {
    alert('Please select a reason')
    return
  }

  hideReportedCard(cardToReport)

  document.getElementById('report-backdrop').classList.remove('open')
})

//delete card after report
function hideReportedCard(id) {
  cardsData = cardsData.filter((card) => card.id != id)
  if (!hiddenCards.includes(id)) {
    hiddenCards.push(id)
    saveHiddenCards()
  }
  cardsData = cardsData.filter((card) => card.id != id)
  renderCards(cardsData)
}
loadCards()
