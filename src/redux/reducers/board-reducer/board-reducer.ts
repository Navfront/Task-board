/* eslint-disable no-debugger */
import { Reducer } from 'react'
import {
  COLUMN_TITLES,
  IProjectsBoard,
  ITask,
  ITaskPosition,
  ITaskPositionWithTarget
} from '../../../model/data-types'
import { deleteOrderEffect, addOrderEffect } from '../../../model/utils'

import { BoardActions } from './actions'

function createTask(
  state: IProjectsBoard,
  column: typeof COLUMN_TITLES[number],
  task: ITask,
  projectId: string
): IProjectsBoard {
  const newState = { ...state }
  newState[projectId] = { ...state[projectId] }
  newState[projectId][column] = [...state[projectId][column]]
  newState[projectId][column].push(task)
  return newState
}

function createBoardById(state: IProjectsBoard, projectId: string): IProjectsBoard {
  if (!Object.hasOwn(state, projectId)) {
    const newState: IProjectsBoard = Object.assign({}, state, {
      [projectId]: {
        [COLUMN_TITLES[0]]: [],
        [COLUMN_TITLES[1]]: [],
        [COLUMN_TITLES[2]]: []
      }
    })
    return newState
  }
  return state
}

function deleteBoardById(state: IProjectsBoard, projectId: string): IProjectsBoard {
  return state
}

function updateTask(
  state: IProjectsBoard,
  task: ITask,
  projectId: string,
  position: ITaskPosition
): IProjectsBoard {
  const newState = { ...state }
  newState[projectId] = { ...state[projectId] }
  const index = newState[projectId][position.current].findIndex((t) => t.id === task.id)
  if (index === -1) return state

  if (position.current !== position.moveTo) {
    newState[projectId][position.moveTo] = [...state[projectId][position.moveTo]]
    newState[projectId][position.current] = state[projectId][position.current].filter(
      (t) => t.id !== task.id
    )

    let newTask: ITask
    if (position.current === 'Development' && position.moveTo !== 'Development') {
      const inWorkAcc = Math.abs(Date.now() - task.inWorkStartTime + task.inWorkAcc)
      newTask = { ...task, status: position.moveTo, inWorkAcc, inWorkStartTime: 0 }
    } else if (position.current !== 'Development' && position.moveTo === 'Development') {
      newTask = { ...task, status: position.moveTo, inWorkStartTime: Date.now() }
    } else {
      newTask = { ...task, status: position.moveTo }
    }
    newState[projectId][position.moveTo].push(newTask)
    return newState
  }

  newState[projectId][position.current] = [
    ...state[projectId][position.current].slice(0, index),
    task,
    ...state[projectId][position.current].slice(index + 1)
  ]

  return newState
}

function moveTask(
  state: IProjectsBoard,
  task: ITask,
  projectId: string,
  position: ITaskPositionWithTarget
): IProjectsBoard {
  const newState = { ...state }
  newState[projectId] = { ...state[projectId] }
  newState[projectId][position.current] = newState[projectId][position.current].filter(
    (t) => t.id !== task.id
  )

  // Две варианта: перемещение в колонку position.moveTo или на место таска position.toTaskId

  if (position.toTaskId != null) {
    const target = newState[projectId][position.moveTo].find(
      (t) => t.id === position.toTaskId
    ) as ITask

    const targetOrder = target.order

    newState[projectId][position.current] = deleteOrderEffect(
      newState[projectId][position.current],
      task.order
    )

    newState[projectId][position.moveTo] = addOrderEffect(
      newState[projectId][position.moveTo],
      targetOrder
    )

    let newTask: ITask

    if (position.current === 'Development' && position.moveTo !== 'Development') {
      newTask = {
        ...task,
        status: position.moveTo,
        order: targetOrder,
        inWorkAcc: Math.abs(Date.now() - task.inWorkStartTime + task.inWorkAcc),
        inWorkStartTime: 0
      }
    } else if (position.current !== 'Development' && position.moveTo === 'Development') {
      newTask = {
        ...task,
        status: position.moveTo,
        order: targetOrder,
        inWorkStartTime: Date.now()
      }
    } else {
      newTask = {
        ...task,
        status: position.moveTo,
        order: targetOrder
      }
    }

    newState[projectId][position.moveTo].push(newTask)
  } else {
    let newTask: ITask
    if (position.current === 'Development' && position.moveTo !== 'Development') {
      newTask = {
        ...task,
        status: position.moveTo,
        order: 0,
        inWorkAcc: Math.abs(Date.now() - task.inWorkStartTime + task.inWorkAcc),
        inWorkStartTime: 0
      }
    } else if (position.current !== 'Development' && position.moveTo === 'Development') {
      newTask = {
        ...task,
        status: position.moveTo,
        order: 0,
        inWorkStartTime: Date.now()
      }
    } else {
      newTask = {
        ...task,
        status: position.moveTo,
        order: 0
      }
    }

    newState[projectId][position.current] = deleteOrderEffect(
      newState[projectId][position.current],
      task.order
    )
    newState[projectId][position.moveTo] = addOrderEffect(newState[projectId][position.moveTo], 0)
    newState[projectId][position.moveTo].push(newTask)
  }

  return newState
}

function deleteTask(state: IProjectsBoard, projectId: string, task: ITask): IProjectsBoard {
  const newState = { ...state }
  newState[projectId] = { ...state[projectId] }
  newState[projectId][task.status] = newState[projectId][task.status].filter(
    (t) => t.id !== task.id
  )
  return newState
}

function toggleSubTask(
  state: IProjectsBoard,
  taskId: string,
  subTaskId: string,
  projectId: string,
  column: typeof COLUMN_TITLES[number]
): IProjectsBoard {
  const newState = { ...state }
  newState[projectId] = { ...newState[projectId] }
  newState[projectId][column] = [
    ...newState[projectId][column].map((t) => {
      if (t.id === taskId) {
        const index = t.subTasks.findIndex((subT) => subT.id === subTaskId)
        if (index !== -1) {
          const isDone = !t.subTasks[index].isDone
          t.subTasks = [
            ...t.subTasks.slice(0, index),
            { ...t.subTasks[index], isDone },
            ...t.subTasks.slice(index + 1)
          ]
          return { ...t }
        }
      }
      return t
    })
  ]
  return newState
}

export const boardReducer: Reducer<IProjectsBoard, BoardActions> = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_BOARD_TEMPLATE_BY_PROJECT_ID':
      return createBoardById(state, action.projectId)
    case 'DELETE_BOARD_BY_PROJECT_ID':
      return deleteBoardById(state, action.projectId)
    case 'INIT_BOARD':
      return state
    case 'SET_BOARD':
      return { ...state, ...action.board }
    case 'CREATE_BOARD_TASK':
      return createTask(state, action.task.status, action.task, action.projectId)
    case 'DELETE_BOARD_TASK':
      return deleteTask(state, action.projectId, action.task)
    case 'MOVE_BOARD_TASK':
      return moveTask(state, action.task, action.projectId, action.position)
    case 'UPDATE_BOARD_TASK':
      return updateTask(state, action.task, action.projectId, action.position)
    case 'TOGGLE_SUB_TASK':
      return toggleSubTask(state, action.taskId, action.subTaskId, action.projectId, action.column)
    default:
      return state
  }
}
/* eslint-disable no-debugger */
