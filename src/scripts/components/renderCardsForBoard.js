import { Element } from '../lib/element.js'
import { boards, saveBoards } from '../states/storage.js'

export function renderCardsBoard(boardId) {
  const container = document.querySelector('.cards-container')
  if (!container) return
  container.innerHTML = ''

  const board = boards.find((b) => b.id === boardId)
  if (!board) return

  board.cards.forEach((card) => {
    if (!card) return

    const cardEl = new Element(
      'div',
      { class: 'card-wrap', dataset: { id: card.id } },

      new Element('img', { src: card.img, alt: card.desc, class: 'card-img' }),

      new Element('button', {
        class: 'delete-card-btn',
        textContent: '✖',
        onclick: () => {
          board.cards = board.cards.filter((c) => c.id !== card.id)
          saveBoards()
          renderCardsBoard(boardId)
        },
      }),

      new Element(
        'div',
        { class: 'card-info' },
        new Element(
          'div',
          { class: 'card-avatar' },
          new Element('img', { src: card.authorAvatar, alt: 'avatar' })
        ),
        new Element(
          'div',
          { class: 'card-description' },
          new Element('a', { href: '#', textContent: card.desc })
        )
      )
    )

    container.append(cardEl)
  })
}
