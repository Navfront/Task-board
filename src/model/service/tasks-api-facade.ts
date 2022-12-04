import { ITask } from './../data-types'
import { FakeTasksFetch } from './fake-tasks-fetch'
import { LocalStorageApi } from './local-storage-api'
import { QueryApi } from './query-api'

export class TasksApiFacade {
  static tasksQueryApi = new QueryApi<ITask, 'tasks'>(
    LocalStorageApi.getInstance(),
    new FakeTasksFetch()
  )

  hello(): void {}
}
