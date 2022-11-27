import { Reducer } from 'react'
import { Project } from '../../../model/data-types'
import { MOCK_PROJECTS } from '../../../model/mock'
import { ProjectsActions } from './actions'

export const projectsReducer: Reducer<Project[], ProjectsActions> = (
  state = MOCK_PROJECTS,
  action
) => {
  switch (action.type) {
    case 'ADD':
      return state
    case 'DELETE':
      return state
    case 'CHANGE_TITLE':
      return state
    case 'UPDATE_DESCRIPTION':
      return state
    case 'UPDATE_LAST_VISIT':
      return state
    default:
      return state
  }
}
