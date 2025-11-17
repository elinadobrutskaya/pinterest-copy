import { Element } from '../lib/element.js'

export function renderCards(cards = [], avatar) {
  const container = document.getElementById('cards-container')
  if (!container) return

  container.innerHTML = ''

  cards.forEach(({ img, desc }) => {
    const card = new Element(
      'div',
      { class: 'card-wrap' },

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
          new Element('button', { class: 'save', textContent: 'Сохранить' }),
          new Element('button', {
            class: 'save-at',
            textContent: 'Сохранить на…',
          })
        ),

        new Element(
          'div',
          { class: 'report-button' },
          new Element('button', { class: 'report', textContent: '!' })
        )
      ),

      new Element(
        'div',
        { class: 'card-info' },
        new Element(
          'div',
          { class: 'card-avatar' },
          new Element('img', { src: avatar, alt: 'avatar' })
        ),
        new Element(
          'div',
          { class: 'card-description' },
          new Element('a', { textContent: desc, href: '#' })
        )
      )
    )

    container.append(card)
  })
}
