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

/**
 * Пост эффект обработки массива тасков. Всем таскам с большим ордером уменьшает его на -1
 * @param tasks Массив тасков
 * @param currentOrder Текущий ордер
 * @returns
 */
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

/**
 * Пост эффект обработки массива тасков. Всем таскам с большим или равным ордером увеличивает его на +1
 * @param tasks Массив тасков
 * @param currentOrder Текущий ордер
 * @returns
 */
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
