import { all, call } from 'redux-saga/effects'
import { watchGetAllProjectsAsync } from './projects-saga'

export function* rootWatcher(): any {
  yield all([call(watchGetAllProjectsAsync)])
}
