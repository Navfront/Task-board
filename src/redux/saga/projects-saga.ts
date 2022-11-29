import { call, put, takeEvery } from 'redux-saga/effects'
import { IProject } from '../../model/data-types'
import { ProjectsApiFacade } from '../../model/service/projects-api-facade'
import { AllActionTypes } from '../reducers/types'

// GET_ALL_PROJECTS

const fetchProjects = async (): Promise<IProject[]> => {
  return await ProjectsApiFacade.projectsQueryApi.get()
}

function* getAllProjectsAsync(): any {
  const projects = yield call(fetchProjects)

  yield put({ type: 'GET_ALL_PROJECTS', projects })
}

export function* watchGetAllProjectsAsync(): any {
  yield takeEvery<AllActionTypes>('INIT_APP', getAllProjectsAsync)
}

// ADD_PROJECT

const addProject = async (project: IProject): Promise<boolean> => {
  return await ProjectsApiFacade.projectsQueryApi.add(project)
}

function* addProjectAsync(action: any): any {
  yield call(addProject, action.project)
}

export function* watchAddProjectAsync(): any {
  yield takeEvery<AllActionTypes>('ADD_PROJECT', addProjectAsync)
}

// DELETE_PROJECT

const deleteProject = async (project: IProject): Promise<boolean> => {
  return await ProjectsApiFacade.projectsQueryApi.delete(project)
}

function* deleteProjectAsync(action: any): any {
  yield call(deleteProject, action.project)
}

export function* watchDeleteProjectAsync(): any {
  yield takeEvery<AllActionTypes>('DELETE_PROJECT', deleteProjectAsync)
}
