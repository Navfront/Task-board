import { columnTitles, ITask } from './task-reducer'

interface ActionTaskCreate {
  type: 'CREATE_TASK'
  task: PartialOptional<ITask, RequiredTaskKeys>
}

type RequiredTaskKeys = 'taskId' | 'title' | 'createdDate'

type PartialOptional<T, K extends keyof T> = Partial<Omit<T, K>> | Pick<T, K>

interface ActionTaskDelete {
  type: 'DELETE_TASK'
  taskId: Pick<ITask, 'taskId'>
}

interface ActionTaskMove {
  type: 'MOVE_TASK'
  taskId: Pick<ITask, 'taskId'>
  from: typeof columnTitles[number]
  to: typeof columnTitles[number]
}

interface ActionTaskUpdate {
  type: 'UPDATE_TASK'
  task: ITask
}

export type BoardActions = ActionTaskCreate | ActionTaskDelete | ActionTaskUpdate | ActionTaskMove
