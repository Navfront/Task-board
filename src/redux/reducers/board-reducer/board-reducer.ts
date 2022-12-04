import { Reducer } from 'react'
import { columnTitles, IProjectsBoard, ITask } from '../../../model/data-types'
import { BoardActions } from './actions'

function createTask(
  state: IProjectsBoard,
  column: typeof columnTitles[number],
  task: ITask,
  projectId: string
): IProjectsBoard {
  const newState = Object.assign({}, state)
  newState[projectId][column].push(task)
  return newState
}

export const boardReducer: Reducer<IProjectsBoard, BoardActions> = (state = {}, action) => {
  switch (action.type) {
    case 'GET_ALL_BOARDS':
      return state
    case 'CREATE_BOARD_TASK':
      return createTask(state, action.task.status, action.task, action.projectId)
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
