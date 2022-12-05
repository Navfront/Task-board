import { LocalStorageApi } from './local-storage-api'
import { COLUMN_TITLES, IProjectsBoard, ITask } from '../data-types'

export interface FetchBoardApiInterface {
  getTasksByProjectId: (projectId: string, userId: string | null) => Promise<ITask[]>
  addTask: (task: ITask, projectId: string, userId: string | null) => Promise<boolean>
  updateTask: (task: ITask, projectId: string, userId: string | null) => Promise<boolean>
  deleteTask: (task: ITask, projectId: string, userId: string | null) => Promise<boolean>
}

/**
 * Класс для обработки fetch запросов и параллельнго копирвоания в localStorage
 */
export class BoardsQueryApi {
  localStorage: LocalStorageApi
  fetchBoardApi: FetchBoardApiInterface

  constructor(localStorageApi: LocalStorageApi, fetchBoardApi: FetchBoardApiInterface) {
    this.localStorage = localStorageApi
    this.fetchBoardApi = fetchBoardApi
  }

  /**
   * Создать задачу
   * @param projectId Принимает id проекта
   * @param task Принимает новую задачу
   * @param userId Принимает id Юзера или null
   * @returns Возвразает true в случае успешного создания задачи на стороне сервера
   */
  public async addTask(projectId: string, task: ITask, userId: string | null): Promise<boolean> {
    const resp = await this.fetchBoardApi.addTask(task, projectId, userId)
    if (resp) {
      this.localStorage.addItem(projectId, task)
      return true
    }
    return false
  }

  /**
   * Удалить задачу
   * @param projectId Принимает id проекта
   * @param task Принимает задачу на удаление
   * @param userId Принимает id Юзера или null
   * @returns Возвразает true в случае успешного удаления задачи на стороне сервера
   */
  public async deleteTask(projectId: string, task: ITask, userId: string | null): Promise<boolean> {
    const resp = await this.fetchBoardApi.deleteTask(task, projectId, userId)
    if (resp) {
      this.localStorage.updateItemById(projectId, task, true)
      return true
    }
    return false
  }

  /**
   * Обновить задачу
   * @param projectId Принимает id проекта
   * @param task Принимает новую задачу для обновления старой
   * @param userId Принимает id Юзера или null
   * @returns Возвразает true в случае успешного обновления задачи на стороне сервера
   */
  public async updateTask(projectId: string, task: ITask, userId: string | null): Promise<boolean> {
    const resp = await this.fetchBoardApi.updateTask(task, projectId, userId)
    if (resp) {
      this.localStorage.updateItemById(projectId, task)
      return true
    }
    return false
  }

  /**
   * Запрос всех задач по id-проекта
   * @param projectId Принимает id проекта
   * @param userId Принимает id Юзера или null
   * @returns Возвращает массив задач
   */
  public async getAllTaskByProjectId(
    projectId: string,
    userId: string | null
  ): Promise<IProjectsBoard> {
    const board: IProjectsBoard = {
      [projectId]: {
        userId,
        [COLUMN_TITLES[0]]: [],
        [COLUMN_TITLES[1]]: [],
        [COLUMN_TITLES[2]]: []
      }
    }
    const resp = await this.fetchBoardApi.getTasksByProjectId(projectId, userId)
    for (const task of resp) {
      board[projectId][task.status].push(task)
    }
    this.localStorage.setItems(projectId, resp)
    return board
  }
}
