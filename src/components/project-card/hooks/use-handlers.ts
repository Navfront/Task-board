import { MouseEventHandler, MouseEvent } from 'react'

import { useAppDispatch } from '../../../redux'
import { IProject } from './../../../model/data-types'

export const useHandlers = (
  project: IProject
): {
  onDeleteHandler: typeof onDeleteHandler
  onLinkClickHandler: typeof onLinkClickHandler
  onEditClickHandler: typeof onEditClickHandler
} => {
  const dispatch = useAppDispatch()

  const onDeleteHandler: MouseEventHandler<HTMLElement> = (): void => {
    dispatch({ type: 'DELETE_PROJECT', project })
  }

  const onLinkClickHandler: MouseEventHandler<HTMLElement> = (event: MouseEvent): void => {
    const target = event.target as HTMLElement
    if (target.nodeName === 'BUTTON') {
      event.preventDefault()
    }
  }

  const onEditClickHandler: MouseEventHandler<HTMLElement> = (): void => {
    dispatch({ type: 'OPEN_MODAL', childType: 'EDITOR_EDIT_PROJECT', data: project })
  }

  return { onLinkClickHandler, onDeleteHandler, onEditClickHandler }
}
