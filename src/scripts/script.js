import { Element } from './lib/element.js'
import { renderCards } from './components/renderCards.js'
import avatar from '../img/avatar/user-avatar.png'
import clock from '../img/cards/clock.jpg'
import coffee from '../img/cards/coffee.jpg'
import couple from '../img/cards/couple.jpg'
import dinner from '../img/cards/dinner.jpg'
import fall from '../img/cards/fall.jpg'
import ocean from '../img/cards/ocean.jpg'
import paris from '../img/cards/paris.jpg'
import pumpkin from '../img/cards/pumpkin.jpg'
import puppy from '../img/cards/puppy.jpg'
import sweater from '../img/cards/sweater.jpg'
import tiramisu from '../img/cards/tiramisu.jpg'
import windows from '../img/cards/windows.jpg'

export const imagesData = [
  { img: clock, desc: '#clock' },
  { img: coffee, desc: '#coffee' },
  { img: couple, desc: '#couple' },
  { img: dinner, desc: '#dinner' },
  { img: fall, desc: '#fall' },
  { img: ocean, desc: '#ocean' },
  { img: paris, desc: '#paris' },
  { img: pumpkin, desc: '#pumpkin' },
  { img: puppy, desc: '#puppy' },
  { img: sweater, desc: '#sweater' },
  { img: tiramisu, desc: '#tiramisu' },
  { img: windows, desc: '#windows' },
]

function App() {
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
            placeholder: 'Поиск',
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
                new Element('img', { src: avatar, alt: 'avatar' })
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

const appRoot = App()
document.querySelector('.ROOT').append(appRoot)

renderCards(imagesData, avatar)
