export const inputSearch = document.getElementById('input-search')
inputSearch.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim()
  const filtered = cardsData.filter(
    (card) => card.desc && card.desc.toLowerCase().includes(query)
  )
  renderCards(filtered)
})
