import { ModalPayload } from './modal-reducer'

interface IModalActionOpen {
  type: 'OPEN_MODAL'
  payload?: ModalPayload
}

interface IModalActionClose {
  type: 'CLOSE_MODAL'
}

export type ModalActions = IModalActionOpen | IModalActionClose
