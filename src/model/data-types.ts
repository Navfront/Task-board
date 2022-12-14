export interface IProject {
  id: string
  userId: string
  title: string
  description: string
  time: Date | null
  newComments: number
}

export interface IProjectMove {
  fromId: IProject['id']
  toId: IProject['id']
}

export type LocalStorageApiTypes = string

export interface Item {
  id: string
  [k: string]: any
}

export const COLUMN_TITLES = ['Queue', 'Development', 'Done'] as const
export const PRIORITIES = ['Low', 'Middle', 'Hight'] as const

export interface ITask {
  id: string
  index: number
  order: number
  title: string
  description: string
  createdDate: Date
  inWorkAcc: number
  inWorkStartTime: number
  doneDate: null | Date
  priority: typeof PRIORITIES[number]
  files: FileReader[]
  status: typeof COLUMN_TITLES[number]
  subTasks: ISubTask[]
  comments: string[]
}

export type IBoard = {
  [column in typeof COLUMN_TITLES[number]]: ITask[]
}

export interface UserId {
  userId: string | null
}
export type BoardWithUserId = IBoard & UserId

export interface IProjectsBoard {
  [projectId: string]: BoardWithUserId
}

export interface IExtendedWithProjectIdTask extends ITask {
  projectId: string
}

export interface ICommentsModalData {
  projectId: string
  taskId: string
  taskTitle: string
}

export type ModalData = IProject | IExtendedWithProjectIdTask | ICommentsModalData | null

export interface ITaskPosition {
  current: typeof COLUMN_TITLES[number]
  moveTo: typeof COLUMN_TITLES[number]
}

export interface ITaskPositionWithTarget extends ITaskPosition {
  toTaskId?: string
}

export interface ColumnItem {
  columnTitle: typeof COLUMN_TITLES[number]
  projectId: string
}
export type BoardItems = ColumnItem | ITask

export interface ISubTask {
  id: string
  text: string
  isDone: boolean
}

export interface IComment {
  id: string
  userId: string | null
  projectId: string
  taskId: string
  text: string
  likes: number
  children: string[]
  parent: string | null
}

export interface IExComment {
  id: string
  userId: string | null
  projectId: string
  taskId: string
  text: string
  likes: number
  children: IExComment[]
  parent: string | null
}

export interface ICommentsState {
  [taskId: string]: IExComment[]
}
