import { ISubTask } from '../../../model/data-types'

interface ISubTaskActionAdd {
  type: 'SUBTASK_ADD'
  newSubTask: ISubTask
}

interface ISubTaskActionDelete {
  type: 'SUBTASK_DELETE'
  subTaskToDelete: ISubTask
}

interface ISubTaskActionEdit {
  type: 'SUBTASK_EDIT'
  subTask: ISubTask
}

interface ISubTaskInitSet {
  type: 'SUBTASK_INIT_SET'
  subTasks: ISubTask[]
}
interface ISubTaskClearAll {
  type: 'SUBTASK_CLEAR_ALL'
}

export type SubTaskActions =
  | ISubTaskActionAdd
  | ISubTaskActionDelete
  | ISubTaskActionEdit
  | ISubTaskInitSet
  | ISubTaskClearAll

export type SubTaskActionTypes = SubTaskActions[keyof Pick<SubTaskActions, 'type'>]
