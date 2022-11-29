import { Item } from '../data-types'
import { LocalStorageApi } from './local-storage-api'

export interface FetchApiInterface<T> {
  itemType: string
  add: (project: T) => Promise<boolean>
  get: () => Promise<T[]>
  update: (project: T) => Promise<boolean>
  delete: (projectId: string) => Promise<boolean>
}

export class QueryApi<T extends Item> {
  private readonly localStorageApi: LocalStorageApi
  private readonly fetchApi: FetchApiInterface<T>

  constructor(
    localStorageApi: LocalStorageApi,
    fetchApi: FetchApiInterface<T>
  ) {
    this.localStorageApi = localStorageApi
    this.fetchApi = fetchApi
  }

  async add(project: T): Promise<boolean> {
    const result = await this.fetchApi.add(project)
    if (result) {
      this.localStorageApi.addItem(this.fetchApi.itemType, project)
      return true
    }
    return false
  }

  async get(): Promise<T[]> {
    const result = await this.fetchApi.get()
    if (result.length > 0) {
      this.localStorageApi.setItems(this.fetchApi.itemType, result)
    }
    return result
  }

  async update(project: T): Promise<boolean> {
    const result = await this.fetchApi.update(project)
    if (result) {
      this.localStorageApi.updateItemById(this.fetchApi.itemType, project)
      return true
    }
    return false
  }

  async delete(project: T): Promise<boolean> {
    const result = await this.fetchApi.delete(project.id)
    if (result) {
      this.localStorageApi.updateItemById(this.fetchApi.itemType, project, true)
      return true
    }
    return false
  }
}
