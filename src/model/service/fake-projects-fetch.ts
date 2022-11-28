import { Project } from '../data-types'
import { LocalStorageApi } from './local-storage-api'
import { FetchApiInterface } from './query-api'

export class FakeProjectsFetch implements FetchApiInterface<Project> {
  itemType: string
  timeout: number

  constructor() {
    this.itemType = 'project'
    this.timeout = 500
  }

  async add(project: Project): Promise<boolean> {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, this.timeout)
    })
  }

  async get(): Promise<Project[]> {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(LocalStorageApi.getInstance().getItems('project'))
      }, this.timeout)
    })
  }

  async update(project: Project): Promise<boolean> {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, this.timeout)
    })
  }

  async delete(projectId: string): Promise<boolean> {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, this.timeout)
    })
  }
}
