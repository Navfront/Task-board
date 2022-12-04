import { columnTitles, IProjectsBoard, ITask } from '../../../model/data-types'

interface ActionBoardCreateTask {
  type: 'CREATE_BOARD_TASK'
  projectId: string
  task: ITask
}

interface ActionBoardDeleteTask {
  type: 'DELETE_BOARD_TASK'
  projectId: string
  taskId: Pick<ITask, 'id'>
}

interface ActionBoardMoveTask {
  type: 'MOVE_BOARD_TASK'
  taskId: Pick<ITask, 'id'>
  projectId: string
  from: typeof columnTitles[number]
  to: typeof columnTitles[number]
}

interface ActionBoardUpdateTask {
  type: 'UPDATE_BOARD_TASK'
  board: ITask
  projectId: string
}

interface ActionBoardGetAll {
  type: 'GET_ALL_BOARDS'
  projectsBoard: IProjectsBoard
}

export type BoardActions =
  | ActionBoardCreateTask
  | ActionBoardDeleteTask
  | ActionBoardUpdateTask
  | ActionBoardMoveTask
  | ActionBoardGetAll

export type BoardActionTypes = BoardActions[keyof Pick<BoardActions, 'type'>]
