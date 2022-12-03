import { columnTitles, ITask, priorities } from '../../redux/reducers/task-reducer/task-reducer'
import { useState } from 'react'

interface ITaskEditorProps {
  mode: 'CREATE' | 'EDIT'
  task?: ITask
}

function TaskEditor({ mode, task }: ITaskEditorProps): JSX.Element {
  const [title, setTitle] = useState(task?.title ?? '')
  const [description, setDescription] = useState(task?.description ?? '')
  const [status, setStatus] = useState(task?.status ?? 'Queue')
  const [priority, setPriority] = useState(task?.priority ?? 'mid')

  return (
    <form className='task-editor'>
      <header className='task-editor__header'>
        <h2 className='task-editor__title'>
          <span>{task?.taskId ?? ''}</span>
          {task?.title ?? 'Create new task'}
        </h2>
      </header>
      <main>
        <label>
          <span className='task-editor__label-text'>Priority</span>
          <select
            onChange={(e) => {
              const value = e.target.value as typeof priorities[number]
              console.log(value, priority)

              setPriority(value)
            }}
          >
            <optgroup label='Priority'>
              {priorities.map((pri) => (
                <option key={'priority' + pri} value={pri}>
                  {pri}
                </option>
              ))}
            </optgroup>
          </select>
        </label>

        <label>
          <span className='task-editor__label-text'>Title</span>
          <input
            type='text'
            placeholder='Write title here..'
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
            }}
          />
        </label>
        <label>
          <span className='task-editor__label-text'>Description</span>
          <input
            type='text'
            placeholder='Write description here..'
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
            }}
          />
        </label>
        <label>
          <span className='task-editor__label-text'>Column</span>
          <select
            onChange={(e) => {
              const value = e.target.value as typeof columnTitles[number]
              console.log(value, status)

              setStatus(value)
            }}
          >
            <optgroup label='Column'>
              {columnTitles.map((colTitle) => (
                <option key={'option' + colTitle} value={colTitle}>
                  {colTitle}
                </option>
              ))}
            </optgroup>
          </select>
        </label>
        <label>
          <p>Add sub tasks:</p>
          <input type='text' />
        </label>

        <label>
          <span className='task-editor__label-text'>Files</span>
          <input type='file' multiple />
        </label>

        <p className='task-editor__submit-controls'>
          <button className='task-editor__control-btn' type='submit'>
            {task?.title != null ? 'Edit' : 'Create'}
          </button>
          <button className='task-editor__control-btn' type='button'>
            Close
          </button>
        </p>
      </main>
    </form>
  )
}

export default TaskEditor
