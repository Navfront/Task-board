import { Reducer } from 'react'
import { columnTitles, IBoard, ITask } from '../../../model/data-types'

import { BoardActions } from './actions'

function createTask(state: IBoard, column: typeof columnTitles[number], task: ITask): IBoard {
  const newState = Object.assign({}, state)
  newState[column].push(task)
  return newState
}

export const boardReducer: Reducer<IBoard, BoardActions> = (
  state = { Queue: [], Development: [], Done: [] },
  action
) => {
  switch (action.type) {
    case 'CREATE_TASK':
      return createTask(state, action.task.status, action.task)
    case 'DELETE_TASK':
      return state
    case 'MOVE_TASK':
      return state
    case 'UPDATE_TASK':
      return state
    default:
      return state
  }
}
