import { boards } from '../states/storage.js'
import { renderCardsBoard } from './renderCardsForBoard.js'
import { Element } from '../lib/element.js'

const params = new URLSearchParams(window.location.search)
const boardId = Number(params.get('id'))
const board = boards.find((b) => b.id === boardId)

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
      { id: 'board-title', class: 'board-title' },
      board ? board.title : 'Board'
    )
  )
)

document.body.prepend(header)
renderCardsBoard(boardId)
