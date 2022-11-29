import { IProject } from '../../model/data-types'
import { useEditorHandlers } from './hooks/use-editor-handlers'

export interface IProjectEditorProps {
  project?: IProject
  mode: 'CREATE' | 'EDIT'
}

function ProjectEditor({ project, mode }: IProjectEditorProps): JSX.Element {
  const {
    onCancelClickHandler,
    onSubmitHandler,
    title,
    description,
    onChangeDescriptionHandler,
    onChangeTitleHandler
  } = useEditorHandlers({
    mode,
    project
  })

  return (
    <form className='project-editor' onSubmit={onSubmitHandler}>
      <fieldset className='project-editor__fieldset'>
        <label htmlFor='project-editor__title-input' className='project-editor__label'>
          Title
        </label>
        <input
          id='project-editor__title-input'
          type='text'
          className='project-editor__title-input'
          placeholder='Enter new title here'
          value={title ?? ''}
          onChange={onChangeTitleHandler}
        />
        <label htmlFor='project-editor__description-input' className='project-editor__label'>
          Description
        </label>
        <textarea
          id='project-editor__description-input'
          className='project-editor__description-input'
          placeholder='Description of your project'
          value={description ?? ''}
          onChange={onChangeDescriptionHandler}
        ></textarea>
        <button type='submit' className='project-editor__button'>
          {project?.title != null ? 'Edit' : 'Create'}
        </button>
        <button type='button' className='project-editor__button' onClick={onCancelClickHandler}>
          Cancel
        </button>
      </fieldset>
    </form>
  )
}

export default ProjectEditor
