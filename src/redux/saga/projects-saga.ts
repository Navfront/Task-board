import { call, put, takeEvery } from 'redux-saga/effects'
import { Project } from '../../model/data-types'
import { ProjectsApiFacade } from '../../model/service/projects-api-facade'

const fetchProjects = async (): Promise<Project[]> => {
  return await ProjectsApiFacade.projectsQueryApi.get()
}

function* getAllProjectsAsync(): any {
  const projects = yield call(fetchProjects)

  yield put({ type: 'GET_ALL_PROJECTS', projects })
}

export function* watchGetAllProjectsAsync(): any {
  yield takeEvery('INIT_PROJECTS', getAllProjectsAsync)
}
