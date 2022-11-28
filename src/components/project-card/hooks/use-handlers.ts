import { MouseEventHandler, MouseEvent } from 'react'

import { useAppDispatch } from '../../../redux'

export const useHandlers = (): {
  onDeleteHandler: typeof onDeleteHandler
  onLinkClickHandler: typeof onLinkClickHandler
} => {
  const dispatch = useAppDispatch()

  const onDeleteHandler: MouseEventHandler<HTMLElement> = (
    event: MouseEvent
  ): void => {
    const target = event.currentTarget as HTMLElement
    const id = target.dataset.id ?? ''
    dispatch({ type: 'DELETE_PROJECT', id })
  }

  const onLinkClickHandler: MouseEventHandler<HTMLElement> = (
    event: MouseEvent
  ): void => {
    const target = event.target as HTMLElement
    if (target.nodeName === 'BUTTON') {
      event.preventDefault()
    }
  }

  return { onLinkClickHandler, onDeleteHandler }
}
