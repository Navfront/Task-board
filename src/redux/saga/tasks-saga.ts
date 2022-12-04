import { put, takeEvery, call } from 'redux-saga/effects'
import { TasksApiFacade } from '../../model/service/tasks-api-facade'
import {
  ActionBoardCreateTask,
  ActionBoardInit,
  ActionBoardUpdateTask
} from '../reducers/board-reducer/actions'
import { IProjectsBoard, ITask } from './../../model/data-types'

// GET_ALL_TASKS

const fetchTasks = async (projectId: string, userId: string | null): Promise<IProjectsBoard> => {
  return await TasksApiFacade.boardQueryApi.getAllTaskByProjectId(projectId, userId)
}

function* getAllTasksAsync(action: ActionBoardInit): any {
  const board = yield call(fetchTasks, action.projectId, null)
  yield put({ type: 'SET_BOARD', board, projectId: action.projectId })
}

export function* watchGetAllTasksAsync(): any {
  yield takeEvery('INIT_BOARD', getAllTasksAsync)
}

// ADD_TASKS

const addTask = async (task: ITask, projectId: string): Promise<boolean> => {
  return await TasksApiFacade.boardQueryApi.addTask(projectId, task, null)
}

function* addTaskAsync(action: ActionBoardCreateTask): any {
  yield call(addTask, action.task, action.projectId)
}

export function* watchAddTaskAsync(): any {
  yield takeEvery('CREATE_BOARD_TASK', addTaskAsync)
}

// UPDATE_TASK

const updateTask = async (projectId: string, task: ITask): Promise<boolean> => {
  return await TasksApiFacade.boardQueryApi.updateTask(projectId, task, null)
}

function* updateTaskAsync(action: ActionBoardUpdateTask): any {
  yield call(updateTask, action.projectId, action.task)
}

export function* watchUpdateTaskAsync(): any {
  yield takeEvery('UPDATE_BOARD_TASK', updateTaskAsync)
}
