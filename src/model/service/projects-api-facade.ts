import { Project } from '../data-types'
import { FakeProjectsFetch } from './fake-projects-fetch'
import { LocalStorageApi } from './local-storage-api'
import { QueryApi } from './query-api'

export class ProjectsApiFacade {
  static projectsQueryApi = new QueryApi<Project>(
    LocalStorageApi.getInstance(),
    new FakeProjectsFetch()
  )

  hello(): void {}
}
