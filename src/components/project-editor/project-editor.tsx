import { FormEvent, useState } from 'react'
import { Project } from '../../model/data-types'
import { useAppDispatch } from '../../redux'
import { ProjectsApiFacade } from './../../model/service/projects-api-facade'

interface ProjectEditorProps {
  project?: Project
}

function ProjectEditor({ project }: ProjectEditorProps): JSX.Element {
  const [title, setTitle] = useState(project?.title ?? '')
  const [description, setDescription] = useState(project?.description ?? '')
  const [isLoading, setIsLoading] = useState(false)

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
    setIsLoading(true)
    ProjectsApiFacade.projectsQueryApi
      .add(newProject)
      .then((ok) => {
        if (ok) {
          dispatch({
            type: 'ADD_PROJECT',
            project: newProject
          })
          setIsLoading(false)
          dispatch({ type: 'CLOSE_MODAL' })
        }
      })
      .catch(console.log)
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
          {isLoading
            ? 'Loading...'
            : project?.title != null
              ? 'Edit'
              : 'Create'}
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
