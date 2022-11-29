import { FormEvent, useState } from 'react'
import { IProject } from '../../model/data-types'
import { useAppDispatch } from '../../redux'

interface IProjectEditorProps {
  project?: IProject
}

function ProjectEditor({ project }: IProjectEditorProps): JSX.Element {
  const [title, setTitle] = useState(project?.title ?? '')
  const [description, setDescription] = useState(project?.description ?? '')

  const dispatch = useAppDispatch()

  const onCancelClickHandler = (): void => {
    dispatch({ type: 'CLOSE_MODAL', payload: { isOpen: false } })
  }

  const onSubmitButtonClick = (event: FormEvent): void => {
    event.preventDefault()
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
  }

  return (
    <form className='project-editor' onSubmit={onSubmitButtonClick}>
      <fieldset className='project-editor__fieldset'>
        <label
          htmlFor='project-editor__title-input'
          className='project-editor__label'
        >
          Title
        </label>
        <input
          id='project-editor__title-input'
          type='text'
          className='project-editor__title-input'
          placeholder='Enter new title here'
          value={title ?? ''}
          onChange={(event) => {
            setTitle(event.target.value)
          }}
        />
        <label
          htmlFor='project-editor__description-input'
          className='project-editor__label'
        >
          Description
        </label>
        <textarea
          id='project-editor__description-input'
          className='project-editor__description-input'
          placeholder='Description of your project'
          value={description ?? ''}
          onChange={(event) => {
            setDescription(event.target.value)
          }}
        ></textarea>
        <button type='submit' className='project-editor__button'>
          {project?.title != null ? 'Edit' : 'Create'}
        </button>
        <button
          type='button'
          className='project-editor__button'
          onClick={onCancelClickHandler}
        >
          Cancel
        </button>
      </fieldset>
    </form>
  )
}

export default ProjectEditor
