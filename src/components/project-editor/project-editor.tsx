import { useState } from 'react'
import { Project } from '../../model/data-types'

interface ProjectEditorProps {
  project?: Project
}

function ProjectEditor({ project }: ProjectEditorProps): JSX.Element {
  const [title, setTitle] = useState(project?.title ?? '')
  const [description, setDescription] = useState(project?.description ?? '')

  return (
    <form
      className='project-editor'
      onSubmit={(event) => {
        event.preventDefault()
      }}
    >
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
        <button type='button' className='project-editor__button'>
          Cancel
        </button>
      </fieldset>
    </form>
  )
}

export default ProjectEditor
