import ReactDOM from 'react-dom'
import { useAppSelector } from '../../../redux'
import { useDialogHandling } from './hooks/use-dialog-handling'
import { IModalState } from '../../../redux/reducers/modal-reducer/modal-reducer'
import ProjectEditor from '../../project-editor/project-editor'

const portal = document.getElementById('portal')

function Modal(): JSX.Element {
  const modalState = useAppSelector<IModalState>((state) => state.modalReducer)

  const { modalRef } = useDialogHandling()

  const createChildrenByType = (modalState: IModalState): JSX.Element => {
    switch (modalState.childType) {
      case 'EDITOR_CREATE_PROJECT':
        return <ProjectEditor mode='CREATE' />
      case 'EDITOR_EDIT_PROJECT':
        return <ProjectEditor mode='EDIT' project={modalState.data ?? undefined} />
      default:
        return <></>
    }
  }

  if (portal !== null) {
    return ReactDOM.createPortal(
      <dialog className='modal' ref={modalRef}>
        <div className='modal__layout'>{createChildrenByType(modalState)}</div>
      </dialog>,
      portal
    )
  }
  return <></>
}

export default Modal
