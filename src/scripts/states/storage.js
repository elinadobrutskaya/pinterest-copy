// BOARDS
export let boards = JSON.parse(localStorage.getItem('boards')) || []

export function saveBoards() {
  localStorage.setItem('boards', JSON.stringify(boards))
}

// HIDDEN CARDS
export let hiddenCards = JSON.parse(localStorage.getItem('hiddenCards')) || []

export function saveHiddenCards() {
  localStorage.setItem('hiddenCards', JSON.stringify(hiddenCards))
}

//CARDS DATA
export let cardsData = JSON.parse(localStorage.getItem('cardsData')) || []

export function saveCardsData() {
  localStorage.setItem('cardsData', JSON.stringify(cardsData))
}
