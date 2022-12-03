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

export type LocalStorageApiTypes = 'projects'

export interface Item {
  id: string
  [k: string]: any
}
