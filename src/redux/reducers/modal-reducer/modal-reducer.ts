import { Reducer } from 'react'
import { ModalActions, ModalChildTypes } from './actions'
import { IProject } from './../../../model/data-types'

export interface IModalState {
  isOpen: boolean
  childType: ModalChildTypes | null
  data?: IProject | null
}

export const modalReducer: Reducer<IModalState, ModalActions> = (
  state = { isOpen: false, childType: null, data: null },
  action
) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        isOpen: true,
        childType: action.childType,
        data: action.data != null ? action.data : null
      }

    case 'CLOSE_MODAL':
      return { isOpen: false, childType: null }
    default:
      return state
  }
}
