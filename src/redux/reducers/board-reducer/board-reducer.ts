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

function createBoardById(state: IProjectsBoard, projectId: string): IProjectsBoard {
  if (!Object.hasOwn(state, projectId)) {
    const newState: IProjectsBoard = Object.assign({}, state, {
      [projectId]: {
        [columnTitles[0]]: [],
        [columnTitles[1]]: [],
        [columnTitles[2]]: []
      }
    })
    return newState
  }
  return state
}

function deleteBoardById(state: IProjectsBoard, projectId: string): IProjectsBoard {
  if (Object.hasOwn(state, projectId)) {
    const newState = Object.assign({}, state)
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete newState[projectId]
  }
  return state
}

export const boardReducer: Reducer<IProjectsBoard, BoardActions> = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_BOARD_TEMPLATE_BY_PROJECT_ID':
      return createBoardById(state, action.projectId)
    case 'DELETE_BOARD_BY_PROJECT_ID':
      return deleteBoardById(state, action.projectId)
    case 'INIT_BOARD':
      return state
    case 'SET_BOARD':
      return action.board
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
