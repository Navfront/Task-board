import { Reducer } from 'react'
import { ModalActions, ModalChildTypes } from './actions'

export interface IModalState {
  isOpen: boolean
  childType: ModalChildTypes | null
}

export const modalReducer: Reducer<IModalState, ModalActions> = (
  state = { isOpen: false, childType: null },
  action
) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { isOpen: true, childType: action.childType }

    case 'CLOSE_MODAL':
      return { isOpen: false, childType: null }
    default:
      return state
  }
}
