import { Reducer } from 'react'
import { IProject } from '../../../model/data-types'
import { ModalActions } from './actions'

export interface IModalState {
  isOpen: boolean
  currentProject?: IProject
}

export const modalReducer: Reducer<IModalState, ModalActions> = (
  state = { isOpen: false },
  action
) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...state, isOpen: true }
    case 'CLOSE_MODAL':
      return { ...state, isOpen: false }
    default:
      return state
  }
}
