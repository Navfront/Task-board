import { combineReducers } from 'redux'
import { modalReducer } from './modal-reducer/modal-reducer'
import { projectsReducer } from './projects-reducer/projects-reducer'
import { appReducer } from './app-reducer/app-reducer'
import { boardReducer } from './board-reducer/board-reducer'
import { searchReducer } from './search-reducer/search-reducer'
import { subTaskReducer } from './sub-task-reducer/sub-task-reducer'
import { commentsReducer } from './comments-reducer/comments-reducer'

export const rootReducer = combineReducers({
  appReducer,
  projectsReducer,
  modalReducer,
  boardReducer,
  searchReducer,
  subTaskReducer,
  commentsReducer
})
