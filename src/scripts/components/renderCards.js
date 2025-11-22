import { Element } from '../lib/element.js'

export function renderCards(cards = []) {
  const container = document.getElementById('cards-container')
  if (!container) return

  container.innerHTML = ''

  cards.forEach(({ img, desc, authorAvatar, isFavorite, id, createdAt }) => {
    const card = new Element(
      'div',
      { class: 'card-wrap', dataset: { id } },

      ////////image
      new Element('img', {
        src: img,
        alt: desc,
        class: 'card-img',
      }),

      ////////buttons
      new Element(
        'div',
        { class: 'card-buttons' },

        new Element(
          'div',
          { class: 'card-buttons_left' },
          new Element('button', {
            class: `save ${isFavorite ? 'active' : ''}`,
            textContent: 'Сохранить',
          }),
          new Element('button', {
            class: 'save-at',
            textContent: 'Сохранить на…',
          })
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

      //////////card info
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
          new Element('a', { textContent: desc, href: '#' })
          // new Element('span', {
          //   class: 'created-at',
          //   textContent: new Date(createdAt * 1000).toLocaleDateString(),
          // })
        )
      )
    )

    container.append(card)
  })
}
