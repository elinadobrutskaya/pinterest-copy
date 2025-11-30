import { Element } from '../lib/element.js'

export function Card(card) {
  const { id, img, desc, authorAvatar, isFavorite } = card

  const SAVE_BTN = new Element('button', {
    class: `save ${isFavorite ? 'active' : ''}`,
    textContent: 'Save',
  })

  const SAVE_MODAL = new Element(
    'div',
    { class: 'save-to-board-modal' },
    new Element(
      'button',
      { class: 'save-new-board' },
      new Element('span', { textContent: 'New Board' })
    ),
    new Element('div', { class: 'save-board-list' })
  )

  const REPORT_BTN = new Element('button', {
    class: 'report',
    textContent: '!',
  })

  const cardEl = new Element(
    'div',
    { class: 'card-wrap', dataset: { id } },

    // image
    new Element('img', {
      src: img,
      alt: desc || '',
      class: 'card-img',
    }),

    // buttons
    new Element(
      'div',
      { class: 'card-buttons' },
      new Element('div', { class: 'card-buttons_left' }, SAVE_BTN, SAVE_MODAL),
      new Element('div', { class: 'report-button' }, REPORT_BTN)
    ),

    // info
    new Element(
      'div',
      { class: 'card-info' },
      new Element(
        'div',
        { class: 'card-avatar' },
        new Element('img', {
          alt: 'avatar',
          src: authorAvatar || '/avatar/user-avatar.png',
        })
      ),
      new Element(
        'div',
        { class: 'card-description' },
        new Element('a', { href: '#', textContent: desc || '' })
      )
    )
  )

  return cardEl
}
export function renderCards(cards = [], target) {
  const container = target || document.getElementById('cards-container')
  if (!container) return

  container.innerHTML = ''

  cards.forEach((c) => {
    container.appendChild(Card(c))
  })
}
