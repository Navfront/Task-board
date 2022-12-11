import { IComment } from '../data-types'

interface ICommentsStore {
  [projectId: string]: {
    [taskId: string]: IComment[]
  }
}

export class LocalStorageCommentsApi {
  private static _INSTANCE: LocalStorageCommentsApi
  private readonly COMMENTS_NAME: string

  constructor() {
    this.COMMENTS_NAME = 'comments'
  }

  static get INSTANCE(): LocalStorageCommentsApi {
    if (this._INSTANCE == null) {
      this._INSTANCE = new LocalStorageCommentsApi()
    }
    return this._INSTANCE
  }

  /**
   * Возвращает обьект комментариев из LocalStorage
   * @param projectId string
   * @param taskId string
   * @returns ICommentsStore
   */
  private getStore(projectId: string, taskId: string): ICommentsStore {
    const comments = localStorage.getItem(this.COMMENTS_NAME)
    if (comments === null) {
      const dumb = {
        [projectId]: {
          [taskId]: []
        }
      }
      localStorage.setItem(this.COMMENTS_NAME, JSON.stringify(dumb))
      return dumb
    }

    const parsed = JSON.parse(comments) as ICommentsStore
    if (!Object.hasOwn(parsed, projectId)) {
      parsed[projectId] = {}
    }
    if (!Object.hasOwn(parsed[projectId], taskId)) {
      parsed[projectId][taskId] = []
      localStorage.setItem(this.COMMENTS_NAME, JSON.stringify(parsed))
    }
    return parsed
  }

  /**
   * Возвращает массив комментов из LocalStorage
   * @param projectId string
   * @param taskId string
   * @returns IComment[]
   */
  get(projectId: string, taskId: string): IComment[] {
    const getResult = this.getStore(projectId, taskId)
    return getResult[projectId][taskId]
  }

  /**
   * Добавляет комментарий в стор комментов в LocalStorage
   * @param projectId string
   * @param taskId string
   * @param comment IComment
   */
  add(projectId: string, taskId: string, comment: IComment): void {
    const getResult = this.getStore(projectId, taskId)
    if (comment.parent !== null) {
      const parentIndex = getResult[projectId][taskId].findIndex((c) => c.id === comment.parent)
      if (parentIndex !== -1) {
        getResult[projectId][taskId][parentIndex].children.push(comment.id)
      }
    }

    getResult[projectId][taskId].push(comment)
    localStorage.setItem(this.COMMENTS_NAME, JSON.stringify(getResult))
  }

  /**
   * Удаляет комментарий из стора комментов в LocalStorage
   * @param projectId
   * @param taskId
   * @param comment
   * @returns true / false от успеха обновления
   */
  delete(projectId: string, taskId: string, comment: IComment): boolean {
    const getResult = this.getStore(projectId, taskId)
    const comments = getResult[projectId][taskId]
    let result = comments
    const delIndex = comments.findIndex((c) => c.id === comment.id)

    if (delIndex !== -1) {
      const delCondidate = { ...comments[delIndex] }
      const delChildren = delCondidate.children
      const parent = delCondidate.parent

      if (parent != null) {
        const parentIndex = comments.findIndex((c) => c.id === parent)

        if (parentIndex !== -1) {
          comments[parentIndex].children = comments[parentIndex].children.filter(
            (id) => id !== comment.id
          )
        }
      }

      const rx = new RegExp(delChildren.concat(delCondidate.id).join('|'), 'g')
      result = comments.filter((c) => {
        // rx.test(c.id) not works!!!
        if (c.id.match(rx) === null) {
          return true
        }
        return false
      })

      getResult[projectId][taskId] = result
      localStorage.setItem(this.COMMENTS_NAME, JSON.stringify(getResult))
      return true
    }

    return false
  }

  /**
   * Обновляет обьект коментария в LocalStorage
   * @param projectId string
   * @param taskId string
   * @param comment IComment
   * @returns true / false от успеха обновления
   */
  update(projectId: string, taskId: string, comment: IComment): boolean {
    const getResult = this.getStore(projectId, taskId)
    const commentIndex = getResult[projectId][taskId].findIndex((c) => c.id === comment.id)
    if (commentIndex !== -1) {
      const oldComment = { ...getResult[projectId][taskId][commentIndex] }
      getResult[projectId][taskId][commentIndex] = {
        ...comment,
        children: oldComment.children,
        parent: oldComment.parent,
        projectId: oldComment.projectId,
        userId: oldComment.userId,
        taskId: oldComment.taskId
      }
      localStorage.setItem(this.COMMENTS_NAME, JSON.stringify(getResult))
      return true
    }
    return false
  }
}
