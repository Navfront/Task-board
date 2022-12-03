import { columnTitles, ITask } from '../../../model/data-types'

interface ActionTaskCreate {
  type: 'CREATE_TASK'
  task: ITask
}

interface ActionTaskDelete {
  type: 'DELETE_TASK'
  taskId: Pick<ITask, 'id'>
}

interface ActionTaskMove {
  type: 'MOVE_TASK'
  taskId: Pick<ITask, 'id'>
  from: typeof columnTitles[number]
  to: typeof columnTitles[number]
}

interface ActionTaskUpdate {
  type: 'UPDATE_TASK'
  task: ITask
}

export type BoardActions = ActionTaskCreate | ActionTaskDelete | ActionTaskUpdate | ActionTaskMove
