import { Element } from '../lib/element.js'

export function renderCards(cards = []) {
  const container = document.getElementById('cards-container')
  if (!container) return

  container.innerHTML = ''

  cards.forEach(({ img, desc, authorAvatar, isFavorite, id }) => {
    const card = new Element(
      'div',
      { class: 'card-wrap', dataset: { id } },

      new Element('img', {
        src: img,
        alt: desc,
        class: 'card-img',
      }),

      new Element(
        'div',
        { class: 'card-buttons' },

        new Element(
          'div',
          { class: 'card-buttons_left' },

          new Element('button', {
            class: `save ${isFavorite ? 'active' : ''}`,
            textContent: 'Save',
          }),

          new Element(
            'div',
            { class: 'save-to-board-modal' },

            new Element(
              'button',
              { class: 'save-new-board' },
              new Element('span', { textContent: 'New Board' })
            ),

            new Element('div', {
              class: 'save-board-list',
            })
          )
        ),

        new Element(
          'div',
          { class: 'report-button' },
          new Element('button', {
            class: 'report',
            textContent: '!',
          })
        )
      ),

      new Element(
        'div',
        { class: 'card-info' },

        new Element(
          'div',
          { class: 'card-avatar' },
          new Element('img', {
            alt: 'avatar',
            src: authorAvatar,
          })
        ),

        new Element(
          'div',
          { class: 'card-description' },
          new Element('a', { href: '#', textContent: desc })
        )
      )
    )

    container.append(card)
  })
}
