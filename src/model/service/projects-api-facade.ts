import { IProject } from '../data-types'
import { FakeProjectsFetch } from './fake-projects-fetch'
import { LocalStorageApi } from './local-storage-api'
import { QueryApi } from './query-api'

export class ProjectsApiFacade {
  static projectsQueryApi = new QueryApi<IProject, 'projects'>(
    LocalStorageApi.getInstance(),
    new FakeProjectsFetch()
  )

  hello(): void {}
}
