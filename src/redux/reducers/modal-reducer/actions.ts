export type ModalChildTypes = 'EDITOR_CREATE_PROJECT' | 'EDITOR_EDIT_PROJECT'

interface IModalActionOpen {
  type: 'OPEN_MODAL'
  childType: ModalChildTypes
}

interface IModalActionClose {
  type: 'CLOSE_MODAL'
}

export type ModalActions = IModalActionOpen | IModalActionClose

export type ModalActionTypes = ModalActions[keyof Pick<ModalActions, 'type'>]
