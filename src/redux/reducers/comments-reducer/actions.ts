import { IComment } from './../../../model/data-types'

interface ICommentInit {
  type: 'COMMENTS_INIT'
  projectId: string
  taskId: string
}

interface ICommentAdd {
  type: 'COMMENT_ADD'
  comment: IComment
  projectId: string
  taskId: string
}

interface ICommentUpdate {
  type: 'COMMENT_UPDATE'
  comment: IComment
  projectId: string
  taskId: string
}

interface ICommentDelete {
  type: 'COMMENT_DELETE'
  comment: IComment
  projectId: string
  taskId: string
}

export type CommentsActions = ICommentInit | ICommentUpdate | ICommentAdd | ICommentDelete

export type SearchActionTypes = CommentsActions[keyof Pick<CommentsActions, 'type'>]
