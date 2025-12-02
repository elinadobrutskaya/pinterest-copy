import { App } from './components/renderApp.js'
import { renderCards } from './components/renderCards.js'
import { renderBoardsList, createBoard } from './components/renderBoards.js'
import store, {
  setCards,
  saveCardToBoard,
  hideCard,
  getState,
  subscribe,
  removeBoard,
} from './states/boardsStore.js'

/////////////RENDER APP
const root = App()
document.querySelector('.ROOT').append(root)

// render from store
function rerenderFromStore() {
  const state = getState()
  renderBoardsList()
  renderCards(state.cardsData || [])
}
subscribe(rerenderFromStore)
rerenderFromStore()

// Search
const inputSearch = document.getElementById('input-search')
if (inputSearch) {
  inputSearch.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim()
    const state = getState()
    const filtered = (state.cardsData || []).filter((c) =>
      String(c.desc || '')
        .toLowerCase()
        .includes(query)
    )
    renderCards(filtered)
  })
}

// Cards loading
async function loadCards() {
  try {
    const res = await fetch(
      'https://6921838a512fb4140be070b9.mockapi.io/api/cards'
    )
    const data = await res.json()
    const normalized = data.map((c) => ({ ...c, id: String(c.id) }))
    const { hiddenCards = [] } = getState()
    const visible = normalized.filter(
      (card) => !hiddenCards.includes(String(card.id))
    )
    setCards(visible)
  } catch (err) {
    console.error('Load error:', err)
  }
}
loadCards()

// avatar + boards modal
const avatarWrap = document.getElementById('avatar-wrap')
const boardsModal = document.getElementById('boards-modal')
if (avatarWrap && boardsModal) {
  avatarWrap.addEventListener('click', () => {
    boardsModal.classList.toggle('open')
  })

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.profile-link')) boardsModal.classList.remove('open')
  })
}

// open create board modal
document.addEventListener('click', (e) => {
  if (e.target.closest('.add-board-btn')) {
    boardsModal?.classList.remove('open')
    document.getElementById('create-board-backdrop')?.classList.add('open')
  }
})

// cancel create board
document
  .getElementById('create-board-cancel')
  ?.addEventListener('click', () => {
    document.getElementById('create-board-backdrop')?.classList.remove('open')
  })

// create board
document
  .getElementById('create-board-create')
  ?.addEventListener('click', () => {
    const input = document.getElementById('create-board-input')
    const title = input?.value.trim()
    if (title) {
      createBoard(title)
      input.value = ''
      document.getElementById('create-board-backdrop')?.classList.remove('open')
    }
  })

// name of the board click
document.addEventListener('click', (e) => {
  const boardLink = e.target.closest('.board-link')
  if (boardLink) {
    const boardItem = boardLink.parentNode
    const id = boardItem.dataset.id
    window.location.href = `/board.html?id=${id}`
  }
})

// save card modal toggling & fill save list
document.addEventListener('click', (e) => {
  const saveBtn = e.target.closest('.save')
  if (saveBtn) {
    const wrap = saveBtn.closest('.card-wrap')
    const modal = wrap.querySelector('.save-to-board-modal')

    document.querySelectorAll('.save-to-board-modal').forEach((m) => {
      if (m !== modal) m.classList.remove('open')
    })

    modal.classList.toggle('open')
    fillSaveBoardList(modal.querySelector('.save-board-list'))
    return
  }

  // close when click outside
  if (!e.target.closest('.save-to-board-modal')) {
    document
      .querySelectorAll('.save-to-board-modal')
      .forEach((m) => m.classList.remove('open'))
  }
})

// fill save
function fillSaveBoardList(container) {
  container.innerHTML = ''
  const { boards = [] } = getState()
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
    const boardId = boardItem.dataset.id
    const cardWrap = boardItem.closest ? boardItem.closest('.card-wrap') : null
    const fallbackCard = document
      .querySelector('.save-board-item')
      ?.closest('.card-wrap')
    const cardEl = boardItem.closest('.card-wrap') || fallbackCard
    const openModal = document.querySelector('.save-to-board-modal.open')
    const card = openModal ? openModal.closest('.card-wrap') : cardEl
    const cardId = card?.dataset?.id

    if (!cardId) return

    const state = getState()
    const cardObj = state.cardsData.find((c) => String(c.id) === String(cardId))
    if (!cardObj) return

    saveCardToBoard(boardId, cardObj)

    openModal?.classList.remove('open')
    card.querySelector('.save')?.classList.add('active')
  }
})

// create board from save-menu
document.addEventListener('click', (e) => {
  if (e.target.closest('.save-new-board')) {
    document.getElementById('boards-modal')?.classList.remove('open')
    document.getElementById('create-board-backdrop')?.classList.add('open')
  }
})

// delete board
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-board')) {
    const id = e.target.dataset.id
    removeBoard(id)
  }
})

//// report process
let cardToReport = null

// open report modal
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.report')
  if (!btn) return
  const card = btn.closest('.card-wrap')
  cardToReport = card?.dataset?.id
  document.getElementById('report-backdrop')?.classList.add('open')
})

// close report
document.getElementById('report-cancel')?.addEventListener('click', () => {
  document.getElementById('report-backdrop')?.classList.remove('open')
})

// confirm report
document.getElementById('report-ok')?.addEventListener('click', () => {
  const reason = document.querySelector('input[name="report"]:checked')
  if (!reason) {
    alert('Please select a reason')
    return
  }
  if (cardToReport) hideReportedCard(cardToReport)
  document.getElementById('report-backdrop')?.classList.remove('open')
})

// hide reported card
function hideReportedCard(id) {
  hideCard(id)
}
