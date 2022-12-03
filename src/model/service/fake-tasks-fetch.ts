import { ITask } from '../data-types'
import { LocalStorageApi } from './local-storage-api'
import { FetchApiInterface } from './query-api'

export class FakeTasksFetch implements FetchApiInterface<ITask, 'tasks'> {
  itemType: 'tasks'
  timeout: number

  constructor() {
    this.itemType = 'tasks'
    this.timeout = 500
  }

  async add(): Promise<boolean> {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, this.timeout)
    })
  }

  async get(): Promise<ITask[]> {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(LocalStorageApi.getInstance().getItems(this.itemType))
      }, this.timeout)
    })
  }

  async update(): Promise<boolean> {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, this.timeout)
    })
  }

  async delete(): Promise<boolean> {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, this.timeout)
    })
  }
}
