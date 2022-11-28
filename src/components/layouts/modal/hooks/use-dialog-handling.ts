import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../redux'
import { ModalPayload } from '../../../../redux/reducers/modal-reducer/modal-reducer'

interface ReturnUseDialogHandling {
  modalRef: React.RefObject<HTMLDialogElement>
}

export const useDialogHandling = (): ReturnUseDialogHandling => {
  const modalState = useAppSelector<ModalPayload>((state) => state.modalReducer)
  const dispatch = useAppDispatch()
  const modalRef = React.createRef<HTMLDialogElement>()

  const onWindowEscKeydownHandler = (event: globalThis.KeyboardEvent): void => {
    if (event.key === 'Esc' || event.key === 'Escape') {
      dispatch({ type: 'CLOSE_MODAL' })
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onWindowEscKeydownHandler)
    if (modalState.isOpen) {
      modalRef.current?.showModal()
    } else {
      modalRef.current?.close()
    }

    return () => {
      window.removeEventListener('keydown', onWindowEscKeydownHandler)
    }
  }, [modalState.isOpen])

  return { modalRef }
}
