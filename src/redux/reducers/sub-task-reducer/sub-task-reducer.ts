import { Reducer } from 'react'
import { ISubTask } from '../../../model/data-types'
import { SubTaskActions } from './actions'

const subTaskState: ISubTask[] = []

export type SubTaskState = typeof subTaskState

export const subTaskReducer: Reducer<SubTaskState, SubTaskActions> = (
  state: SubTaskState = subTaskState,
  action
) => {
  switch (action.type) {
    case 'SUBTASK_ADD':
      return [...state, action.newSubTask]
    case 'SUBTASK_DELETE':
      return state.filter((s) => s.id !== action.subTaskToDelete.id)
    case 'SUBTASK_EDIT':
      return state.map((s) => {
        if (s.id === action.subTask.id) {
          return { ...s, text: action.subTask.text, isDone: action.subTask.isDone }
        }
        return s
      })
    case 'SUBTASK_CLEAR_ALL':
      return []
    case 'SUBTASK_INIT_SET':
      return action.subTasks
    default:
      return state
  }
}
