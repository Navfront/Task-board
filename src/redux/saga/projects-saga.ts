import { call, put, takeEvery } from 'redux-saga/effects'
import { IProject, LocalStorageApiTypes } from '../../model/data-types'
import { LocalStorageApi } from '../../model/service/local-storage-api'
import { ProjectsApiFacade } from '../../model/service/projects-api-facade'
import { AllActionTypes } from '../reducers/types'
import { moveItem } from './../utils'

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
  yield put({ type: 'CREATE_BOARD_TEMPLATE_BY_PROJECT_ID', projectId: action.project.id })
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
  yield put({ type: 'DELETE_BOARD_BY_PROJECT_ID', projectId: action.project.id })
}

export function* watchDeleteProjectAsync(): any {
  yield takeEvery<AllActionTypes>('DELETE_PROJECT', deleteProjectAsync)
}

// UPDATE_PROJECT

const updateProject = async (project: IProject): Promise<boolean> => {
  return await ProjectsApiFacade.projectsQueryApi.update(project)
}

function* updateProjectAsync(action: any): any {
  yield call(updateProject, action.project)
}

export function* watchUpdateProjectAsync(): any {
  yield takeEvery<AllActionTypes>('UPDATE_PROJECT', updateProjectAsync)
}

// SHUFFLE_PROJECTS

const setToLocalStorage = async (action: any): Promise<IProject[]> => {
  const localStorageItemType: LocalStorageApiTypes = 'projects'
  const lApi = LocalStorageApi.getInstance()
  const prev = lApi.getItems<IProject>(localStorageItemType)
  const shuffled = moveItem(prev, action.move.fromId, action.move.toId)
  return lApi.setItems<IProject>(localStorageItemType, shuffled)
}

function* shuffleProjects(action: any): any {
  yield call(setToLocalStorage, action)
}

export function* watchMoveProject(): any {
  yield takeEvery<AllActionTypes>('MOVE_PROJECT', shuffleProjects)
}
