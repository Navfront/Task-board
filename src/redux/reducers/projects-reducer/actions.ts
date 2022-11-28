import { Project } from '../../../model/data-types'

interface ActionA {
  type: 'ADD_PROJECT'
  project: Project
}
interface ActionB {
  type: 'DELETE_PROJECT'
  id: string
}
interface ActionC {
  type: 'UPDATE_PROJECT'
  project: Project
}
interface ActionF {
  type: 'GET_ALL_PROJECTS'
  projects: Project[]
}
interface ActionD {
  type: 'INIT_PROJECTS'
}

export type ProjectsActions = ActionA | ActionB | ActionC | ActionF | ActionD
