import { IProject } from '../data-types'
import { FakeProjectsFetch } from './fake-projects-fetch'
import { LocalStorageApi } from './local-storage-api'
import { QueryApi } from './query-api'

/**
 * Класс Singleton-Facade по работе с queryapi
 */
export class ProjectsApiFacade {
  private static INSTANCE: QueryApi<IProject, 'projects'> | undefined
  queryApi: QueryApi<IProject, 'projects'>
  localStorage: LocalStorageApi

  private constructor(queryApy: QueryApi<IProject, 'projects'>, localStorage: LocalStorageApi) {
    this.queryApi = queryApy
    this.localStorage = localStorage
  }

  /**
   * Возвращает инстанс ProjectsApiFacade
   */
  static get projectsQueryApi(): QueryApi<IProject, 'projects'> {
    if (this.INSTANCE === undefined) {
      this.INSTANCE = new QueryApi<IProject, 'projects'>(
        LocalStorageApi.getInstance(),
        new FakeProjectsFetch()
      )
    }
    return this.INSTANCE
  }
}
