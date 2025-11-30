import Store from '../lib/store.js'
import { Storage } from '../services/storage.js'

const STORAGE_KEY = 'pinterest-boards-v1'
const local = new Storage(STORAGE_KEY)

// ACTION TYPES
const GET_BOARDS = 'GET_BOARDS'
const ADD_BOARD = 'ADD_BOARD'
const DELETE_BOARD = 'DELETE_BOARD'
const ADD_CARD_TO_BOARD = 'ADD_CARD_TO_BOARD'

// action creators
export function getBoardsAction(payload) {
  return { type: GET_BOARDS, payload }
}
export function addBoardAction(payload) {
  return { type: ADD_BOARD, payload }
}
export function deleteBoardAction(payload) {
  return { type: DELETE_BOARD, payload }
}
export function addCardToBoardAction(payload) {
  return { type: ADD_CARD_TO_BOARD, payload }
}

// default initial state
const initialState = {
  boards: [],
}

// reducer
function boardsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOARDS:
      return { ...state, boards: action.payload }
    case ADD_BOARD:
      return { ...state, boards: [...state.boards, action.payload] }
    case DELETE_BOARD:
      return {
        ...state,
        boards: state.boards.filter(
          (b) => String(b.id) !== String(action.payload)
        ),
      }
    case ADD_CARD_TO_BOARD:
      return {
        ...state,
        boards: state.boards.map((b) => {
          if (String(b.id) === String(action.payload.boardId)) {
            const exists = b.cards.some(
              (c) => String(c.id) === String(action.payload.card.id)
            )
            return {
              ...b,
              cards: exists ? b.cards : [...b.cards, action.payload.card],
            }
          }
          return b
        }),
      }
    default:
      return state
  }
}

// create store
const boardsStore = new Store(boardsReducer, initialState)

const originalDispatch = boardsStore.dispatch.bind(boardsStore)
boardsStore.dispatch = (action) => {
  originalDispatch(action)
  try {
    local.save(boardsStore.getState().boards)
  } catch (err) {
    console.error('Error saving boards', err)
  }
}

// initialize store
const stored = local.load()
if (Array.isArray(stored)) {
  boardsStore.dispatch(getBoardsAction(stored))
} else {
  boardsStore.dispatch(getBoardsAction([]))
}

export const getBoards = () => boardsStore.getState().boards
export const getBoardById = (id) =>
  boardsStore.getState().boards.find((b) => String(b.id) === String(id))

// exported functions
export function addBoard(title) {
  const newBoard = { id: Date.now(), title, cards: [] }
  boardsStore.dispatch(addBoardAction(newBoard))
  return newBoard
}

export function deleteBoard(id) {
  boardsStore.dispatch(deleteBoardAction(id))
}

export function addCardToBoard(boardId, card) {
  boardsStore.dispatch(addCardToBoardAction({ boardId, card }))
}

export { boardsStore }
