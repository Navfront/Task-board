import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import {
  COLUMN_TITLES,
  IExtendedWithProjectIdTask,
  ISubTask,
  ITask,
  PRIORITIES
} from '../../model/data-types'
import { IModalState } from '../../redux/reducers/modal-reducer/modal-reducer'
import { useAppDispatch, useAppSelector } from './../../redux/index'
import { IProject } from './../../model/data-types'
import { LocalStorageApi } from './../../model/service/local-storage-api'
import SubTaskEditor from '../sub-task-editor/sub-task-editor'

interface ITaskEditorProps {
  mode: 'CREATE' | 'EDIT'
  task?: IExtendedWithProjectIdTask
}

function TaskEditor({ mode, task }: ITaskEditorProps): JSX.Element {
  const modal = useAppSelector<IModalState>((state) => state.modalReducer)
  const subTasks = useAppSelector<ISubTask[]>((state) => state.subTaskReducer)

  const isEdit = mode === 'EDIT'
  const [title, setTitle] = useState(task?.title ?? '')
  const [description, setDescription] = useState(task?.description ?? '')
  const [status, setStatus] = useState(task?.status ?? 'Queue')
  const [priority, setPriority] = useState(task?.priority ?? 'Middle')

  const dispatch = useAppDispatch()
  const newTaskId = Date.now().toString()

  useEffect(() => {
    if (task?.subTasks != null) {
      dispatch({ type: 'SUBTASK_INIT_SET', subTasks: task.subTasks })
    }

    return () => {
      dispatch({ type: 'SUBTASK_CLEAR_ALL' })
    }
  }, [])

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
        id: newTaskId,
        order: index,
        index,
        createdDate: new Date(),
        inWorkAcc: 0,
        inWorkStartTime: 0,
        doneDate: null,
        priority,
        files: [],
        status,
        subTasks,
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
        status: task.status,
        subTasks
      }

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
          {task?.title != null ? task.title : 'Create new task'}
        </h2>
      </header>
      <main>
        <label className='task-editor__label'>
          <span className='task-editor__label-text'>Title</span>
          <input
            className='task-editor__input'
            type='text'
            placeholder='Write title here..'
            value={title}
            onChange={onChangeTitleHandler}
          />
        </label>
        <label className='task-editor__label'>
          <span className='task-editor__label-text'>Description</span>
          <input
            className='task-editor__input'
            type='text'
            placeholder='Write description here..'
            value={description}
            onChange={onChangeDescriptionHandler}
          />
        </label>
        <label className='task-editor__label'>
          <span className='task-editor__label-text'>Priority</span>
          <select
            className='task-editor__select'
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
        <label className='task-editor__label'>
          <span className='task-editor__label-text'>Column</span>
          <select
            className='task-editor__select'
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

        <SubTaskEditor />
        <label className='task-editor__label'>
          <span className='task-editor__label-text'>Files</span>
          <input className='task-editor__input' type='file' multiple />
        </label>

        <p className='task-editor__submit-controls'>
          <button className='task-editor__control-btn task-editor__control-btn--save' type='submit'>
            {isEdit ? 'Save' : 'Create'}
          </button>
          <button
            className='task-editor__control-btn task-editor__control-btn--delete'
            type='button'
            onClick={onDeleteClickHandler}
          >
            Delete
          </button>
          <button
            className='task-editor__control-btn task-editor__control-btn--cancel'
            type='button'
            onClick={onCancelClickHandler}
          >
            Close
          </button>
        </p>
      </main>
    </form>
  )
}

export default TaskEditor
