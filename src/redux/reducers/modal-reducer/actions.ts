import { ModalPayload } from './modal-reducer'

interface ModalActionA {
  type: 'OPEN_MODAL'
  payload?: ModalPayload
}

interface ModalActionB {
  type: 'CLOSE_MODAL'
}

export type ModalActions = ModalActionA | ModalActionB
