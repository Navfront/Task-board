import { Reducer } from 'react'
import { BoardActions } from './actions'
export const columnTitles = ['Queue', 'Development', 'Done'] as const
export const priorities = ['Low', 'Middle', 'Hight'] as const

export interface ITask {
  taskId: string
  order: number
  title: string
  description: string
  createdDate: Date
  inWork: number
  doneDate: null | Date
  priority: typeof priorities[number]
  files: FileReader[]
  status: typeof columnTitles[number]
  subTasks: string[]
  comments: string[]
}

export type IBoard = {
  [column in typeof columnTitles[number]]: ITask[]
}

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
