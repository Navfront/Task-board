import { Reducer } from 'react'

interface ActionA {
  type: 'a'
  a: string
}
interface ActionB {
  type: 'b'
  b: string
}
type Action = ActionA | ActionB

interface Project {
  id: string
  userId: string
  title: string
  description: string
  time: Date
  newComments: number
}

export const projectsReducer: Reducer<Project[], Action> = (
  state = [],
  action
) => {
  switch (action.type) {
    case 'a':
      return state
    case 'b':
      return state
    default:
      return state
  }
}
