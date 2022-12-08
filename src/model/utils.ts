import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ITask } from './data-types'
dayjs.extend(relativeTime)

export const HumanizeLastDate = (date: Date | null): string => {
  if (date != null) {
    return `Last visit: ${dayjs(date).toNow(true)} ago`
  }
  return ''
}

export const deleteOrderEffect = (tasks: ITask[], currentOrder: number): ITask[] => {
  return tasks.map((task) => {
    if (task.order > currentOrder) {
      const newTask = { ...task }
      newTask.order = newTask.order - 1
      return newTask
    }
    return task
  })
}

export const addOrderEffect = (tasks: ITask[], currentOrder: number): ITask[] => {
  return tasks.map((task) => {
    if (task.order >= currentOrder) {
      const newTask = { ...task }
      newTask.order = Number(newTask.order) + 1
      return newTask
    }
    return task
  })
}
