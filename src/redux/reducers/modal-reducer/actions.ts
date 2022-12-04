import { ModalData } from './../../../model/data-types'
export type ModalChildTypes =
  | 'EDITOR_CREATE_PROJECT'
  | 'EDITOR_EDIT_PROJECT'
  | 'EDITOR_CREATE_TASK'
  | 'EDITOR_EDIT_TASK'

interface IModalActionOpen {
  type: 'OPEN_MODAL'
  childType: ModalChildTypes
  data: ModalData
}

interface IModalActionClose {
  type: 'CLOSE_MODAL'
}

export type ModalActions = IModalActionOpen | IModalActionClose

export type ModalActionTypes = ModalActions[keyof Pick<ModalActions, 'type'>]
