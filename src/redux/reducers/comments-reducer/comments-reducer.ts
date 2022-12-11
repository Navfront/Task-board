import { Reducer } from 'react'
import { CommentsActions } from './actions'
import { ICommentsState, IComment } from './../../../model/data-types'
import { LocalStorageCommentsApi } from './../../../model/service/local-storage-comments-api'
import { buildCommentsTree } from './../../../model/utils'

const commentsState: ICommentsState = {}

function addComment(projectId: string, taskId: string, comment: IComment): ICommentsState {
  LocalStorageCommentsApi.INSTANCE.add(projectId, taskId, comment)
  return buildCommentsTree(LocalStorageCommentsApi.INSTANCE.get(projectId, taskId), taskId)
}

function deleteComment(projectId: string, taskId: string, comment: IComment): ICommentsState {
  LocalStorageCommentsApi.INSTANCE.delete(projectId, taskId, comment)
  return buildCommentsTree(LocalStorageCommentsApi.INSTANCE.get(projectId, taskId), taskId)
}

function updateComment(projectId: string, taskId: string, comment: IComment): ICommentsState {
  LocalStorageCommentsApi.INSTANCE.update(projectId, taskId, comment)
  return buildCommentsTree(LocalStorageCommentsApi.INSTANCE.get(projectId, taskId), taskId)
}

export const commentsReducer: Reducer<ICommentsState, CommentsActions> = (
  state: ICommentsState = commentsState,
  action
) => {
  switch (action.type) {
    case 'COMMENTS_INIT':
      return buildCommentsTree(
        LocalStorageCommentsApi.INSTANCE.get(action.projectId, action.taskId),
        action.taskId
      )
    case 'COMMENT_ADD':
      return addComment(action.projectId, action.taskId, action.comment)
    case 'COMMENT_DELETE':
      return deleteComment(action.projectId, action.taskId, action.comment)
    case 'COMMENT_UPDATE':
      return updateComment(action.projectId, action.taskId, action.comment)
    default:
      return state
  }
}
