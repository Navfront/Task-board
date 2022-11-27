import { PropsWithChildren } from 'react'
import ReactDOM from 'react-dom'
import { useAppSelector } from './../../../redux/index'
import { ModalPayload } from './../../../redux/reducers/modal-reducer/modal-reducer'

const portal = document.getElementById('portal')

interface ModalProps extends PropsWithChildren {
  isOpen?: boolean
}

function Modal({ isOpen, children }: ModalProps): JSX.Element {
  const modalState = useAppSelector<ModalPayload>((state) => state.modalReducer)

  if (portal != null && (isOpen === true || modalState.isOpen)) {
    return ReactDOM.createPortal(
      <div className='modal'>{children}</div>,
      portal
    )
  }
  return <></>
}

export default Modal
