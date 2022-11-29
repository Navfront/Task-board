import { Reducer } from 'react'
import { ModalActions } from './actions'

export interface IModalState {
  isOpen: boolean
}

export const modalReducer: Reducer<IModalState, ModalActions> = (
  state = { isOpen: false },
  action
) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { isOpen: true }

    case 'CLOSE_MODAL':
      return { isOpen: false }
    default:
      return state
  }
}
