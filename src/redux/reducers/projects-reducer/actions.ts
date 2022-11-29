import { IProject } from '../../../model/data-types'

interface IProjectActionAdd {
  type: 'ADD_PROJECT'
  project: IProject
}
interface IProjectActionDelete {
  type: 'DELETE_PROJECT'
  project: IProject
}
interface IProjectActionUpdate {
  type: 'UPDATE_PROJECT'
  project: IProject
}
interface IProjectActionGetAll {
  type: 'GET_ALL_PROJECTS'
  projects: IProject[]
}

export type ProjectsActions =
  | IProjectActionAdd
  | IProjectActionDelete
  | IProjectActionUpdate
  | IProjectActionGetAll

export type ProjectActionTypes = ProjectsActions[keyof Pick<ProjectsActions, 'type'>]
