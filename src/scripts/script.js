import { Element } from './lib/element.js'
import { renderCards } from './components/renderCards.js'
import { App } from './components/renderApp.js'

let cardsData = []

const appRoot = App()
document.querySelector('.ROOT').append(appRoot)

const inputSearch = document.getElementById('input-search')
inputSearch.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim()
  const filtered = cardsData.filter(
    (card) => card.desc && card.desc.toLowerCase().includes(query)
  )
  renderCards(filtered)
})

async function loadCards() {
  try {
    const response = await fetch(
      'https://6921838a512fb4140be070b9.mockapi.io/api/cards'
    )
    const data = await response.json()
    cardsData = data // сохраняем все карточки
    renderCards(cardsData)
  } catch (e) {
    console.error('Loading error: ', e)
  }
}

loadCards()
