import React, { PropsWithChildren, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useAppDispatch, useAppSelector } from './../../../redux/index'
import { ModalPayload } from './../../../redux/reducers/modal-reducer/modal-reducer'

const portal = document.getElementById('portal')

interface ModalProps extends PropsWithChildren {
  isOpen?: boolean
}

function Modal({ isOpen, children }: ModalProps): JSX.Element {
  const modalState = useAppSelector<ModalPayload>((state) => state.modalReducer)
  const dispatch = useAppDispatch()
  const modal = React.createRef<HTMLDialogElement>()

  const onWindowEscKeydownHandler = (event: globalThis.KeyboardEvent): void => {
    if (event.key === 'Esc' || event.key === 'Escape') {
      dispatch({ type: 'CLOSE_MODAL' })
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onWindowEscKeydownHandler)
    if (modalState.isOpen) {
      modal.current?.showModal()
    } else {
      modal.current?.close()
    }

    return () => {
      window.removeEventListener('keydown', onWindowEscKeydownHandler)
    }
  }, [modalState.isOpen])

  if (portal !== null) {
    return ReactDOM.createPortal(
      <dialog className='modal' ref={modal}>
        <div className='modal__layout'>{children}</div>
      </dialog>,
      portal
    )
  }
  return <></>
}

export default Modal
