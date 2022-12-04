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

export type LocalStorageApiTypes = 'projects' | 'test' | 'tasks' | string

export interface Item {
  id: string
  [k: string]: any
}

export const columnTitles = ['Queue', 'Development', 'Done'] as const
export const priorities = ['Low', 'Middle', 'Hight'] as const

export interface ITask {
  id: string
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

export interface UserId {
  userId: string | null
}
export type BoardWithUserId = IBoard & UserId

export interface IProjectsBoard {
  [projectId: string]: BoardWithUserId
}
