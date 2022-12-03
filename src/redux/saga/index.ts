import { all, fork } from 'redux-saga/effects'
import {
  watchGetAllProjectsAsync,
  watchAddProjectAsync,
  watchDeleteProjectAsync,
  watchMoveProject,
  watchUpdateProjectAsync
} from './projects-saga'

export function* rootWatcher(): any {
  yield all([
    fork(watchGetAllProjectsAsync),
    fork(watchAddProjectAsync),
    fork(watchDeleteProjectAsync),
    fork(watchMoveProject),
    fork(watchUpdateProjectAsync)
  ])
}
