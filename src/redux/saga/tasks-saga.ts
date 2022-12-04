import { put, takeEvery, call } from 'redux-saga/effects'
import { TasksApiFacade } from '../../model/service/tasks-api-facade'
import { AllActionTypes } from '../reducers/types'
import { ITask } from './../../model/data-types'

// GET_ALL_TASKS

const fetchTasks = async (): Promise<ITask[]> => {
  return await TasksApiFacade.tasksQueryApi.get()
}

function* getAllTasksAsync(): any {
  const Tasks = yield call(fetchTasks)

  yield put({ type: 'GET_ALL_TASKS', Tasks })
}

export function* watchGetAllTasksAsync(): any {
  yield takeEvery<AllActionTypes>('INIT_BOARD', getAllTasksAsync)
}

// ADD_TASKS

const addTask = async (task: ITask): Promise<boolean> => {
  return await TasksApiFacade.tasksQueryApi.add(task)
}

function* addTaskAsync(action: any): any {
  yield call(addTask, action.task)
}

export function* watchAddTaskAsync(): any {
  yield takeEvery<AllActionTypes>('CREATE_BOARD_TASK', addTaskAsync)
}
