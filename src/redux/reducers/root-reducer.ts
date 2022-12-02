import { combineReducers } from 'redux'
import { modalReducer } from './modal-reducer/modal-reducer'
import { projectsReducer } from './projects-reducer/projects-reducer'
import { appReducer } from './app-reducer/app-reducer'
import { boardReducer } from './task-reducer/task-reducer'

export const rootReducer = combineReducers({
  appReducer,
  projectsReducer,
  modalReducer,
  boardReducer
})
