import { ChangeEvent, FormEvent, useState } from 'react'
import { useAppDispatch } from '../../../redux'
import { IProjectEditorProps } from './../project-editor'

export const useEditorHandlers = ({
  mode,
  project
}: IProjectEditorProps): {
  onCancelClickHandler: typeof onCancelClickHandler
  onSubmitHandler: typeof onSubmitHandler
  onChangeTitleHandler: typeof onChangeTitleHandler
  onChangeDescriptionHandler: typeof onChangeDescriptionHandler

  description: string
  title: string
} => {
  const [title, setTitle] = useState(project != null ? project.title : '')
  const [description, setDescription] = useState(project != null ? project.description : '')
  const dispatch = useAppDispatch()

  const onCancelClickHandler = (): void => {
    dispatch({ type: 'CLOSE_MODAL', payload: { isOpen: false } })
  }

  const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value)
  }
  const onChangeDescriptionHandler = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setDescription(event.target.value)
  }

  const onSubmitHandler = (event: FormEvent): void => {
    event.preventDefault()

    if (mode === 'CREATE') {
      const newProject = {
        description,
        title,
        id: Date.now().toString(),
        time: null,
        newComments: 0,
        userId: 'iAm' // need token or userId
      }

      dispatch({
        type: 'ADD_PROJECT',
        project: newProject
      })
    } else if (mode === 'EDIT' && project != null) {
      console.log('newDATA = ', { ...project, title, description })

      dispatch({ type: 'UPDATE_PROJECT', project: { ...project, title, description } })
    }

    dispatch({ type: 'CLOSE_MODAL' })
  }

  return {
    onCancelClickHandler,
    onSubmitHandler,
    onChangeTitleHandler,
    onChangeDescriptionHandler,
    description,
    title
  }
}
