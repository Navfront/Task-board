import { Reducer } from 'react'
import { IProject } from '../../../model/data-types'
import { moveItem } from '../../utils'

import { ProjectsActions } from './actions'

export const projectsReducer: Reducer<IProject[], ProjectsActions> = (
  state: IProject[] = [],
  action
) => {
  switch (action.type) {
    case 'ADD_PROJECT':
      return [...state, action.project]
    case 'GET_ALL_PROJECTS':
      return action.projects
    case 'DELETE_PROJECT':
      return state.filter((p) => p.id !== action.project.id)
    case 'UPDATE_PROJECT':
      return state.map((p) => {
        if (p.id === action.project.id) {
          return action.project
        }
        return p
      })
    case 'MOVE_PROJECT':
      return moveItem(state, action.move.fromId, action.move.toId)
    default:
      return state
  }
}
