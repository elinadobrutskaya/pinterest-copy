import { Element } from '../lib/element'

export function App() {
  const root = new Element(
    'div',
    { class: 'app' },

    // HEADER
    new Element(
      'header',
      { class: 'header' },
      new Element(
        'div',
        { class: 'container' },
        new Element(
          'div',
          { class: 'header-wrap' },

          new Element(
            'div',
            { class: 'logo-wrap' },
            new Element(
              'a',
              { href: '#' },
              new Element('i', { class: 'fa-brands fa-pinterest' })
            )
          ),

          new Element('input', {
            type: 'search',
            placeholder: 'Search...',
            class: 'input-search',
            id: 'input-search',
          }),

          new Element(
            'div',
            { class: 'profile-link' },
            new Element(
              'a',
              { href: '#' },
              new Element(
                'div',
                { class: 'avatar-wrap' },
                new Element('img', {
                  src: '/avatar/user-avatar.png',
                  alt: 'avatar',
                })
              )
            )
          )
        )
      )
    ),

    // MAIN SECTION
    new Element(
      'section',
      { class: 'main-section' },
      new Element(
        'div',
        { class: 'container' },
        new Element('div', { class: 'cards-container', id: 'cards-container' })
      )
    )
  )

  return root
}
