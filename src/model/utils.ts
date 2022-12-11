import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { IComment, ICommentsState, IExComment, ITask } from './data-types'
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

export const filterTasksBySearchString = (str: string, tasks: ITask[]): ITask[] => {
  const rx = new RegExp(str, 'gi')
  return tasks.filter((task) => {
    if (rx.test(String(task.index)) || rx.test(task.title)) {
      return true
    }
    return false
  })
}

export const buildCommentsTree = (comments: IComment[], taskId: string): ICommentsState => {
  const tree: ICommentsState = {}
  if (typeof comments === 'undefined') {
    return tree
  }

  const helperDict: { [commentId: string]: IComment } = {}
  comments.forEach((c) => {
    helperDict[c.id] = c
  })

  const parseComment = (inComment: IComment): IExComment => {
    const result: IExComment = { ...inComment, children: [], parent: null }
    if (inComment.children.length === 0) {
      return result
    }
    if (inComment.children !== null) {
      inComment.children.forEach((c) => {
        result.children.push(parseComment(helperDict[c]))
      })
    }

    return result
  }

  const roots = comments.filter((c) => c.parent === null)
  roots.forEach((root) => {
    tree[taskId].push(parseComment(root))
  })
  return tree
}
