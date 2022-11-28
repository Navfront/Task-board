import { Reducer } from 'react'
import { Project } from '../../../model/data-types'
import { ProjectsActions } from './actions'

export const projectsReducer: Reducer<Project[], ProjectsActions> = (
  state: Project[] = [],
  action
) => {
  switch (action.type) {
    case 'ADD_PROJECT':
      return state
    case 'GET_ALL_PROJECTS':
      return state.concat(action.projects)
    case 'DELETE_PROJECT':
      return state
    case 'UPDATE_PROJECT':
      return state
    default:
      return state
  }
}
