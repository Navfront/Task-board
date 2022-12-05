import { ITask } from '../data-types'
import { FetchBoardApiInterface } from './boards-query-api'
import { LocalStorageApi } from './local-storage-api'

export class FakeTasksFetch implements FetchBoardApiInterface {
  timeout: number

  constructor() {
    this.timeout = 500
  }

  async getTasksByProjectId(projectId: string, userId: string | null): Promise<ITask[]> {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(LocalStorageApi.getInstance().getItems(projectId))
      }, this.timeout)
    })
  }

  async addTask(task: ITask, projectId: string, userId: string | null): Promise<boolean> {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, this.timeout)
    })
  }

  async updateTask(task: ITask, projectId: string, userId: string | null): Promise<boolean> {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, this.timeout)
    })
  }

  async deleteTask(task: ITask, projectId: string, userId: string | null): Promise<boolean> {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, this.timeout)
    })
  }
}
