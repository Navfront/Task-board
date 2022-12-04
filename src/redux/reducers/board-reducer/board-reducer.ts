import { Reducer } from 'react'
import { columnTitles, IProjectsBoard, ITask, ITaskPosition } from '../../../model/data-types'
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

function updateTask(
  state: IProjectsBoard,
  task: ITask,
  projectId: string,
  position: ITaskPosition
): IProjectsBoard {
  if (Object.keys(state).length > 0) {
    const newState = Object.assign({}, state)
    if (position.current !== position.moveTo) {
      newState[projectId][position.current] = newState[projectId][position.current].filter(
        (t) => t.id !== task.id
      )
      const newTask = { ...task, status: position.moveTo }
      newState[projectId][position.moveTo].push(newTask)
    }
    const column = newState[projectId][position.current]
    const taskIndex = column.findIndex((t) => t.id === task.id)
    if (taskIndex >= 0) {
      const newColumn = [...column.slice(1, taskIndex), task, ...column.slice(taskIndex + 1)]
      newState[projectId][task.status] = newColumn
      return newState
    }
    return state
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
      return { ...state, ...action.board }
    case 'CREATE_BOARD_TASK':
      return createTask(state, action.task.status, action.task, action.projectId)
    case 'DELETE_BOARD_TASK':
      return state
    case 'MOVE_BOARD_TASK':
      return state
    case 'UPDATE_BOARD_TASK':
      return updateTask(state, action.task, action.projectId, action.position)
    default:
      return state
  }
}
