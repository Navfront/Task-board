import { Project } from '../data-types'
import { MOCK_PROJECTS } from '../mock'
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
        resolve(MOCK_PROJECTS)
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
