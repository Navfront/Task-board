import { IModalState } from './modal-reducer'

interface IModalActionOpen {
  type: 'OPEN_MODAL'
  payload?: IModalState
}

interface IModalActionClose {
  type: 'CLOSE_MODAL'
}

export type ModalActions = IModalActionOpen | IModalActionClose

export type ModalActionTypes = ModalActions[keyof Pick<ModalActions, 'type'>]
