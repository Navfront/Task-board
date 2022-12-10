import { ChangeEvent, FormEvent, useState } from 'react'
import {
  COLUMN_TITLES,
  IExtendedWithProjectIdTask,
  ITask,
  PRIORITIES
} from '../../model/data-types'
import { IModalState } from '../../redux/reducers/modal-reducer/modal-reducer'
import { useAppDispatch, useAppSelector } from './../../redux/index'
import { IProject } from './../../model/data-types'
import { LocalStorageApi } from './../../model/service/local-storage-api'
import { ISubTaskProps } from '../sub-task/sub-task'

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
  const [subTasks, setSubTasks] = useState<ISubTaskProps[]>([])
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

  const onDeleteClickHandler = (): void => {
    if (task != null) {
      dispatch({
        type: 'DELETE_BOARD_TASK',
        projectId: task?.projectId,
        task
      })
    }
    dispatch({ type: 'CLOSE_MODAL' })
  }

  const onSubmitHandler = (event: FormEvent): void => {
    event.preventDefault()

    if (mode === 'CREATE') {
      const data = modal?.data as IProject
      const projectId = data.id
      const index = LocalStorageApi.getInstance().getLastOrder('tasks') + 1
      const newTask: ITask = {
        description,
        title,
        id: Date.now().toString(),
        order: index,
        index,
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
              const value = e.target.value as typeof PRIORITIES[number]
              setPriority(value)
            }}
          >
            <optgroup label='Priority'>
              {PRIORITIES.map((pri) => (
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
            defaultValue={task?.status}
            onChange={(e) => {
              const value = e.target.value as typeof COLUMN_TITLES[number]
              setStatus(value)
            }}
          >
            <optgroup label='Column'>
              {COLUMN_TITLES.map((colTitle) => (
                <option key={'option' + colTitle} value={colTitle}>
                  {colTitle}
                </option>
              ))}
            </optgroup>
          </select>
        </label>
        <button
          type='button'
          onClick={() => {
            const newSubTask: ISubTaskProps = {
              index: 0,
              text: '',
              taskId: task?.id ?? '',
              canModify: true
            }
            setSubTasks([...subTasks, newSubTask])
          }}
        >
          Add sub-task
        </button>
        <ul className='task-editor__sub-tasks'>
          {subTasks.map((s) => (
            <li key={'sub' + s.index.toString()}>
              <button type='button'>
                <span className='visually-hidden'>add sub-task </span>{' '}
                <svg className='svg' width='42' height='42'>
                  <use xlinkHref='img/sprite.svg#icon-add'></use>
                </svg>
              </button>
            </li>
          ))}
        </ul>
        <label>
          <span className='task-editor__label-text'>Files</span>
          <input type='file' multiple />
        </label>

        <p className='task-editor__submit-controls'>
          <button className='task-editor__control-btn' type='submit'>
            {isEdit ? 'Edit' : 'Create'}
          </button>
          <button className='task-editor__control-btn' type='button' onClick={onDeleteClickHandler}>
            Delete
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
