import { MouseEventHandler, MouseEvent } from 'react'

import { useAppDispatch } from '../../../redux'
import { Project } from './../../../model/data-types'

export const useHandlers = (
  project: Project
): {
  onDeleteHandler: typeof onDeleteHandler
  onLinkClickHandler: typeof onLinkClickHandler
} => {
  const dispatch = useAppDispatch()

  const onDeleteHandler: MouseEventHandler<HTMLElement> = (): void => {
    dispatch({ type: 'DELETE_PROJECT', project })
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
