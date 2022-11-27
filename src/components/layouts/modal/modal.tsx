import { PropsWithChildren } from 'react'
import ReactDOM from 'react-dom'

const portal = document.getElementById('portal')

interface ModalProps extends PropsWithChildren {
  isOpen: boolean
}

function Modal({ isOpen, children }: ModalProps): JSX.Element {
  if (portal != null && isOpen) {
    return ReactDOM.createPortal(
      <div className='modal'>{children}</div>,
      portal
    )
  }
  return <></>
}

export default Modal
