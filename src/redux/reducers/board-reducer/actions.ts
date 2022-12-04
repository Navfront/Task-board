import { IProjectsBoard, ITask, ITaskPosition } from '../../../model/data-types'
export interface ActionBoardCreateEmpty {
  type: 'CREATE_BOARD_TEMPLATE_BY_PROJECT_ID'
  projectId: string
}

export interface ActionBoardDeleteBoard {
  type: 'DELETE_BOARD_BY_PROJECT_ID'
  projectId: string
}

export interface ActionBoardCreateTask {
  type: 'CREATE_BOARD_TASK'
  projectId: string
  task: ITask
}

export interface ActionBoardDeleteTask {
  type: 'DELETE_BOARD_TASK'
  projectId: string
  taskId: Pick<ITask, 'id'>
}

export interface ActionBoardMoveTask {
  type: 'MOVE_BOARD_TASK'
  taskId: Pick<ITask, 'id'>
  projectId: string
  position: ITaskPosition
}

export interface ActionBoardUpdateTask {
  type: 'UPDATE_BOARD_TASK'
  task: ITask
  projectId: string
  position: ITaskPosition
}

export interface ActionBoardInit {
  type: 'INIT_BOARD'
  projectId: string
}

export interface ActionBoardSetAll {
  type: 'SET_BOARD'
  projectId: string
  board: IProjectsBoard
}

export type BoardActions =
  | ActionBoardCreateTask
  | ActionBoardDeleteTask
  | ActionBoardUpdateTask
  | ActionBoardMoveTask
  | ActionBoardInit
  | ActionBoardCreateEmpty
  | ActionBoardDeleteBoard
  | ActionBoardSetAll

export type BoardActionTypes = BoardActions[keyof Pick<BoardActions, 'type'>]
