import { columnTitles, ITask } from './task-reducer'

interface ActionCreateTask {
  type: 'CREATE_TASK'
  task: PartialOptional<ITask, RequiredTaskKeys>
}

type RequiredTaskKeys = 'taskId' | 'title' | 'createdDate'

type PartialOptional<T, K extends keyof T> = Partial<Omit<T, K>> | Pick<T, K>

interface ActionDeleteTask {
  type: 'DELETE_TASK'
  taskId: Pick<ITask, 'taskId'>
}

interface ActionMoveTask {
  type: 'MOVE_TASK'
  taskId: Pick<ITask, 'taskId'>
  from: typeof columnTitles[number]
  to: typeof columnTitles[number]
}

export type BoardActions = ActionCreateTask | ActionDeleteTask | ActionMoveTask
