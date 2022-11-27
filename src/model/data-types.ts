export interface Project {
  id: string
  userId: string
  title: string
  description: string
  time: Date | null
  newComments: number
}

export type LocalStorageApiTypes = 'projects'
