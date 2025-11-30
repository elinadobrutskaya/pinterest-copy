import { Element } from '../lib/element.js'
import { subscribe, getState } from '../states/boardsStore.js'
import { renderCardsBoard } from './renderCardsForBoard.js'

const params = new URLSearchParams(window.location.search)
const boardId = params.get('id')

// Header
const header = new Element(
  'header',
  { class: 'board-header' },
  new Element(
    'div',
    { class: 'container header-wrapper' },
    new Element(
      'div',
      { class: 'logo-wrap' },
      new Element(
        'a',
        { href: '/' },
        new Element('i', { class: 'fa-brands fa-pinterest' })
      )
    ),
    new Element(
      'h1',
      { class: 'board-title', id: 'board-title' },
      getState().boards.find((b) => String(b.id) === String(boardId))?.title ||
        'Board'
    )
  )
)
document.body.prepend(header)

// Render cards
renderCardsBoard(boardId)
subscribe(() => renderCardsBoard(boardId))
