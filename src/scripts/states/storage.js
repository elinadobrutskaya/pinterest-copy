export let boards = JSON.parse(localStorage.getItem('boards')) || []

export function saveBoards() {
  localStorage.setItem('boards', JSON.stringify(boards))
}
