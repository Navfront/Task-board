import { ChangeEvent, FormEvent, useState } from 'react'
import { columnTitles, IExtendedWithProjectIdTask, ITask, priorities } from '../../model/data-types'
import { IModalState } from '../../redux/reducers/modal-reducer/modal-reducer'

import { useAppDispatch, useAppSelector } from './../../redux/index'
import { IProject } from './../../model/data-types'

interface ITaskEditorProps {
  mode: 'CREATE' | 'EDIT'
  task?: IExtendedWithProjectIdTask
}

function TaskEditor({ mode, task }: ITaskEditorProps): JSX.Element {
  const modal = useAppSelector<IModalState>((state) => state.modalReducer)

  const isEdit = mode === 'EDIT'
  const [title, setTitle] = useState(task?.title ?? '')
  const [description, setDescription] = useState(task?.description ?? '')
  const [status, setStatus] = useState(task?.status ?? 'Queue')
  const [priority, setPriority] = useState(task?.priority ?? 'Middle')
  const dispatch = useAppDispatch()

  const onCancelClickHandler = (): void => {
    dispatch({ type: 'CLOSE_MODAL', payload: { isOpen: false } })
  }

  const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value)
  }
  const onChangeDescriptionHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setDescription(event.target.value)
  }

  const onSubmitHandler = (event: FormEvent): void => {
    event.preventDefault()

    if (mode === 'CREATE') {
      const data = modal?.data as IProject
      const projectId = data.id
      const newTask: ITask = {
        description,
        title,
        id: Date.now().toString(),
        order: 0,
        createdDate: new Date(),
        inWork: 0,
        doneDate: null,
        priority,
        files: [],
        status,
        subTasks: [],
        comments: []
      }
      dispatch({ type: 'CREATE_BOARD_TASK', projectId, task: newTask })
    } else if (task != null) {
      const data = modal?.data as IExtendedWithProjectIdTask
      const projectId = data.projectId
      const updateTask: ITask = {
        ...task,
        description,
        title,
        priority,
        status: task.status
      }
      console.log({ current: task.status, moveTo: status })

      dispatch({
        type: 'UPDATE_BOARD_TASK',
        task: updateTask,
        projectId,
        position: { current: task.status, moveTo: status }
      })
    }

    dispatch({ type: 'CLOSE_MODAL' })
  }

  return (
    <form className='task-editor' onSubmit={onSubmitHandler}>
      <header className='task-editor__header'>
        <h2 className='task-editor__title'>
          <span>{task?.id ?? ''}</span>
          {task?.title ?? 'Create new task'}
        </h2>
      </header>
      <main>
        <label>
          <span className='task-editor__label-text'>Priority</span>
          <select
            onChange={(e) => {
              const value = e.target.value as typeof priorities[number]
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
            onChange={onChangeTitleHandler}
          />
        </label>
        <label>
          <span className='task-editor__label-text'>Description</span>
          <input
            type='text'
            placeholder='Write description here..'
            value={description}
            onChange={onChangeDescriptionHandler}
          />
        </label>
        <label>
          <span className='task-editor__label-text'>Column</span>
          <select
            onChange={(e) => {
              const value = e.target.value as typeof columnTitles[number]
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
            {isEdit ? 'Edit' : 'Create'}
          </button>
          <button className='task-editor__control-btn' type='button' onClick={onCancelClickHandler}>
            Close
          </button>
        </p>
      </main>
    </form>
  )
}

export default TaskEditor
