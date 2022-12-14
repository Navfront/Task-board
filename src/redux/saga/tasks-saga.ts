import { put, takeEvery, call } from 'redux-saga/effects'
import { TasksApiFacade } from '../../model/service/tasks-api-facade'
import {
  ActionBoardCreateTask,
  ActionBoardDeleteTask,
  ActionBoardInit,
  ActionBoardMoveTask,
  ActionBoardToggleSubtask,
  ActionBoardUpdateTask
} from '../reducers/board-reducer/actions'
import { IProjectsBoard, ITask, ITaskPosition } from './../../model/data-types'

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

const updateTask = async (
  projectId: string,
  task: ITask,
  position: ITaskPosition
): Promise<boolean> => {
  let newTask: ITask
  if (position.current === 'Development' && position.moveTo !== 'Development') {
    const accTime = Math.abs(Date.now() - task.inWorkStartTime + task.inWorkAcc)
    newTask = { ...task, status: position.moveTo, inWorkAcc: accTime, inWorkStartTime: 0 }
  } else if (position.current !== 'Development' && position.moveTo === 'Development') {
    newTask = { ...task, status: position.moveTo, inWorkStartTime: Date.now() }
  } else {
    newTask = { ...task, status: position.moveTo }
  }

  return await TasksApiFacade.boardQueryApi.updateTask(projectId, newTask, null)
}

function* updateTaskAsync(action: ActionBoardUpdateTask): any {
  yield call(updateTask, action.projectId, action.task, action.position)
}

export function* watchUpdateTaskAsync(): any {
  yield takeEvery('UPDATE_BOARD_TASK', updateTaskAsync)
}

// DELETE_TASK

const deleteTask = async (projectId: string, task: ITask): Promise<boolean> => {
  return await TasksApiFacade.boardQueryApi.deleteTask(projectId, task, null)
}

function* deleteTaskAsync(action: ActionBoardDeleteTask): any {
  yield call(deleteTask, action.projectId, action.task)
}

export function* watchDeleteTaskAsync(): any {
  yield takeEvery('DELETE_BOARD_TASK', deleteTaskAsync)
}

// MOVE_TASK

function* moveTaskAsync(action: ActionBoardMoveTask): any {
  yield call(updateTask, action.projectId, action.task, action.position)
}

export function* watchMoveTaskAsync(): any {
  yield takeEvery('MOVE_BOARD_TASK', moveTaskAsync)
}

// TOGGLE_SUBTASK
const toggleSubTask = async (
  subtaskId: string,
  projectId: string,
  task: ITask
): Promise<boolean> => {
  const newSubTasks = task.subTasks.map((sT) => {
    if (sT.id === subtaskId) {
      return { ...sT, isDone: !sT.isDone }
    }
    return sT
  })
  return await TasksApiFacade.boardQueryApi.updateTask(
    projectId,
    { ...task, subTasks: newSubTasks },
    null
  )
}

function* toggleSubTaskAsync(action: ActionBoardToggleSubtask): any {
  yield call(toggleSubTask, action.subTaskId, action.projectId, action.task)
}

export function* watchToggleSubTaskAsync(): any {
  yield takeEvery('TOGGLE_SUB_TASK', toggleSubTaskAsync)
}
