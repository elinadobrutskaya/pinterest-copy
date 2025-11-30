import { Element } from '../lib/element.js'
import { getState, removeCardFromBoard } from '../states/boardsStore.js'

export function renderCardsBoard(boardId) {
  const container = document.querySelector('.cards-container')
  if (!container) return
  container.innerHTML = ''

  const board = getState().boards.find((b) => String(b.id) === String(boardId))
  if (!board || !board.cards) return

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
          removeCardFromBoard(boardId, card.id)
          renderCardsBoard(boardId)
        },
      }),

      new Element(
        'div',
        { class: 'card-info' },
        new Element(
          'div',
          { class: 'card-avatar' },
          new Element('img', {
            src: card.authorAvatar || '/avatar/user-avatar.png',
            alt: 'avatar',
          })
        ),
        new Element(
          'div',
          { class: 'card-description' },
          new Element('a', { href: '#', textContent: card.desc || '' })
        )
      )
    )

    container.append(cardEl)
  })
}
