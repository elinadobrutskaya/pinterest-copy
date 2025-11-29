import { Element } from '../lib/element.js'

export function App() {
  return new Element(
    'div',
    { class: 'app-wrapper' },

    new Element(
      'div',
      { class: 'app' },

      new Element(
        'header',
        { class: 'header' },
        new Element(
          'div',
          { class: 'container' },
          new Element(
            'div',
            { class: 'header-wrap' },

            // logo
            new Element(
              'div',
              { class: 'logo-wrap' },
              new Element(
                'a',
                { href: '#' },
                new Element('i', { class: 'fa-brands fa-pinterest' })
              )
            ),

            // search
            new Element('input', {
              type: 'search',
              placeholder: 'Search...',
              class: 'input-search',
              id: 'input-search',
            }),

            // profile
            new Element(
              'div',
              { class: 'profile-link' },

              // avatar
              new Element(
                'div',
                { class: 'avatar-wrap', id: 'avatar-wrap' },
                new Element('img', {
                  src: '/avatar/user-avatar.png',
                  alt: 'avatar',
                })
              ),

              // modal with boards
              new Element(
                'div',
                { class: 'boards-modal', id: 'boards-modal' },

                new Element(
                  'button',
                  { class: 'add-board-btn' },
                  new Element('span', { textContent: 'New Board' })
                ),

                new Element('div', {
                  class: 'boards-list',
                  id: 'boards-list',
                })
              )
            )
          )
        )
      ),

      // cards
      new Element(
        'section',
        { class: 'main-section' },
        new Element(
          'div',
          { class: 'container' },
          new Element('div', {
            class: 'cards-container',
            id: 'cards-container',
          })
        )
      )
    ),

    // create board modal
    new Element(
      'div',
      { class: 'create-board-backdrop', id: 'create-board-backdrop' },

      new Element(
        'div',
        { class: 'create-board-modal' },

        new Element('h3', { textContent: 'Create Board' }),

        new Element('input', {
          type: 'text',
          placeholder: 'Name',
          class: 'create-board-input',
          id: 'create-board-input',
        }),

        new Element(
          'div',
          { class: 'create-board-actions' },

          new Element(
            'button',
            { class: 'btn-cancel', id: 'create-board-cancel' },
            new Element('span', { textContent: 'Cansel' })
          ),

          new Element(
            'button',
            { class: 'btn-create', id: 'create-board-create' },
            new Element('span', { textContent: 'Create' })
          )
        )
      )
    ),
    //report
    new Element(
      'div',
      { class: 'report-backdrop', id: 'report-backdrop' },

      new Element(
        'div',
        { class: 'report-modal' },

        new Element('h3', { textContent: 'Report Image' }),

        new Element(
          'div',
          { class: 'report-options' },

          new Element(
            'label',
            {},
            new Element('input', {
              type: 'radio',
              name: 'report',
              value: 'inappropriate',
            }),
            new Element('span', { textContent: 'Inappropriate content' })
          ),
          new Element(
            'label',
            {},
            new Element('input', {
              type: 'radio',
              name: 'report',
              value: 'spam',
            }),
            new Element('span', { textContent: 'Spam or misleading' })
          ),
          new Element(
            'label',
            {},
            new Element('input', {
              type: 'radio',
              name: 'report',
              value: 'copyright',
            }),
            new Element('span', { textContent: 'Copyright violation' })
          )
        ),

        new Element(
          'div',
          { class: 'report-actions' },

          new Element(
            'button',
            { class: 'btn-cancel', id: 'report-cancel' },
            new Element('span', { textContent: 'Cancel' })
          ),

          new Element(
            'button',
            { class: 'btn-ok', id: 'report-ok' },
            new Element('span', { textContent: 'OK' })
          )
        )
      )
    )
  )
}
