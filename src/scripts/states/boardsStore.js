// store для boards, cardsData и hiddenCards
import Store from '../lib/store.js'
import { Storage } from '../services/storage.js'

const STORAGE_KEY = 'pinterest-app-state-v1'

// actions
const INIT = 'INIT'
const SET_CARDS = 'SET_CARDS'
const ADD_BOARD = 'ADD_BOARD'
const REMOVE_BOARD = 'REMOVE_BOARD'
const SAVE_CARD_TO_BOARD = 'SAVE_CARD_TO_BOARD'
const HIDE_CARD = 'HIDE_CARD'

// reducer
function reducer(state, action) {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        ...action.payload,
      }

    case SET_CARDS:
      return {
        ...state,
        cardsData: action.payload,
      }

    case ADD_BOARD:
      return {
        ...state,
        boards: [...state.boards, action.payload],
      }

    case REMOVE_BOARD:
      return {
        ...state,
        boards: state.boards.filter(
          (b) => String(b.id) !== String(action.payload)
        ),
      }

    case SAVE_CARD_TO_BOARD: {
      const { boardId, card } = action.payload
      return {
        ...state,
        boards: state.boards.map((b) => {
          if (String(b.id) !== String(boardId)) return b
          // avoid duplicates by id
          if (b.cards.some((c) => String(c.id) === String(card.id))) return b
          return { ...b, cards: [...b.cards, card] }
        }),
      }
    }

    case HIDE_CARD: {
      const cardId = action.payload
      return {
        ...state,
        hiddenCards: state.hiddenCards.includes(String(cardId))
          ? state.hiddenCards
          : [...state.hiddenCards, String(cardId)],
        cardsData: state.cardsData.filter(
          (c) => String(c.id) !== String(cardId)
        ),
      }
    }

    default:
      return state
  }
}

// initial state
const initialState = {
  boards: [],
  cardsData: [],
  hiddenCards: [],
}

const store = new Store(reducer, initialState)
const local = new Storage(STORAGE_KEY)

const persisted = local.load()
if (persisted && typeof persisted === 'object') {
  store.dispatch({ type: INIT, payload: persisted })
}

const origDispatch = store.dispatch.bind(store)
store.dispatch = (action) => {
  origDispatch(action)
  local.save(store.getState())
}

export function getState() {
  return store.getState()
}

export function subscribe(listener) {
  return store.subscribe(listener)
}

// action creators
export function setCards(cards) {
  store.dispatch({ type: SET_CARDS, payload: cards })
}

export function addBoard(title) {
  const b = { id: Date.now(), title, cards: [] }
  store.dispatch({ type: ADD_BOARD, payload: b })
}

export function removeBoard(boardId) {
  store.dispatch({ type: REMOVE_BOARD, payload: boardId })
}

export function saveCardToBoard(boardId, card) {
  store.dispatch({ type: SAVE_CARD_TO_BOARD, payload: { boardId, card } })
}

export function hideCard(cardId) {
  store.dispatch({ type: HIDE_CARD, payload: cardId })
}

export default store
