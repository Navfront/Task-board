import { Reducer } from 'react'
import { columnTitles, IBoard, IProjectsBoard, ITask } from '../../../model/data-types'
import { BoardActions } from './actions'

function createTask(state: IBoard, column: typeof columnTitles[number], task: ITask): IBoard {
  const newState = Object.assign({}, state)
  newState[column].push(task)
  return newState
}

export const boardReducer: Reducer<IProjectsBoard, BoardActions> = (state = {}, action) => {
  switch (action.type) {
    case 'GET_ALL_BOARDS':
      return state
    case 'CREATE_BOARD_TASK':
      return state
    case 'DELETE_BOARD_TASK':
      return state
    case 'MOVE_BOARD_TASK':
      return state
    case 'UPDATE_BOARD_TASK':
      return state
    default:
      return state
  }
}
