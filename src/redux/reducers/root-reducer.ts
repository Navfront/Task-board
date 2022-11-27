import { combineReducers } from 'redux'
import { modalReducer } from './modal-reducer/modal-reducer'
import { projectsReducer } from './projects-reducer/projects-reducer'

export const rootReducer = combineReducers({
  projectsReducer,
  modalReducer
})
