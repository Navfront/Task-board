import ReactDOM from 'react-dom'
import { useAppSelector } from '../../../redux'
import { useDialogHandling } from './hooks/use-dialog-handling'
import { IModalState } from '../../../redux/reducers/modal-reducer/modal-reducer'
import ProjectEditor from '../../project-editor/project-editor'
import { TaskEditor } from '../..'
import {
  ICommentsModalData,
  IExtendedWithProjectIdTask,
  IProject
} from './../../../model/data-types'
import Comments from '../../comments/comments'

const portal = document.getElementById('portal')

function Modal(): JSX.Element {
  const modalState = useAppSelector<IModalState>((state) => state.modalReducer)
  const data = modalState.data

  const { modalRef } = useDialogHandling()

  const createChildrenByType = (modalState: IModalState): JSX.Element => {
    switch (modalState.childType) {
      case 'EDITOR_CREATE_PROJECT':
        return <ProjectEditor mode='CREATE' />
      case 'EDITOR_EDIT_PROJECT':
        return <ProjectEditor mode='EDIT' project={data as IProject} />
      case 'EDITOR_CREATE_TASK':
        return <TaskEditor mode='CREATE' />
      case 'EDITOR_EDIT_TASK':
        return <TaskEditor mode='EDIT' task={data as IExtendedWithProjectIdTask} />
      case 'COMMENTS':
        return <Comments data={data as ICommentsModalData} />
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
