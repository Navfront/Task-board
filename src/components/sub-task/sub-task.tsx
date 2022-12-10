/* eslint-disable @typescript-eslint/no-unused-vars */
import { ITaskProps } from '../task/task'
import { useAppDispatch } from './../../redux/index'

export interface ISubTaskProps {
  subTaskId: string
  index: number
  text: string
  isDisabled: boolean
  checked: boolean
  taskData: ITaskProps
}

function SubTask({
  subTaskId,
  text,
  isDisabled = false,
  taskData,
  checked
}: ISubTaskProps): JSX.Element {
  const dispatch = useAppDispatch()
  return (
    <div className='sub-task'>
      <input
        className='sub-task__input visually-hidden'
        type='checkbox'
        id={'checkbox' + subTaskId}
        disabled={isDisabled}
        checked={checked}
        onChange={() => {
          dispatch({
            type: 'TOGGLE_SUB_TASK',
            column: taskData.status,
            projectId: taskData.projectId,
            subTaskId,
            taskId: taskData.id,
            task: taskData
          })
        }}
      />
      <label className='sub-task__label' htmlFor={'checkbox' + subTaskId} tabIndex={0}>
        {text}
      </label>
    </div>
  )
}

export default SubTask
