import { BoardsQueryApi } from './boards-query-api'
import { FakeTasksFetch } from './fake-tasks-fetch'
import { LocalStorageApi } from './local-storage-api'

export class TasksApiFacade {
  private static INSTANCE: BoardsQueryApi | undefined
  boardQueryApi: BoardsQueryApi
  localStorageApi: LocalStorageApi

  private constructor(boardsQueryApi: BoardsQueryApi, localStorageApi: LocalStorageApi) {
    this.boardQueryApi = boardsQueryApi
    this.localStorageApi = localStorageApi
  }

  static get boardQueryApi(): BoardsQueryApi {
    if (this.INSTANCE === undefined) {
      this.INSTANCE = new BoardsQueryApi(new LocalStorageApi(), new FakeTasksFetch())
    }
    return this.INSTANCE
  }
}
