import { useState } from 'react'
import { ICommentsModalData, ICommentsState, IExComment } from '../../model/data-types'
import { useAppDispatch, useAppSelector } from '../../redux'
import Comment from '../comment/comment'
import CommentsEditor from '../comments-editor/comments-editor'

export interface IEditorState {
  isShow: boolean
  currentComment?: IExComment
}
interface ICommentsProps {
  data: ICommentsModalData
}

function Comments({ data }: ICommentsProps): JSX.Element {
  const comments = useAppSelector<ICommentsState>((state) => state.commentsReducer)
  const [editorState, setEditorState] = useState<IEditorState>({ isShow: false })
  const dispatch = useAppDispatch()
  const { projectId, taskId, taskTitle } = data

  return (
    <article className='comments'>
      <header className='comments__header'>
        <span className='comments__task-title'>{taskTitle}</span>
        <button
          type='button'
          className='comments__btn comments__btn--close'
          onClick={() => {
            dispatch({ type: 'CLOSE_MODAL' })
          }}
        >
          <svg className='svg' width='42' height='42'>
            <use xlinkHref='Task-board/img/sprite.svg#icon-close'></use>
          </svg>
          <span className='visually-hidden'>close comments</span>
        </button>
      </header>
      <main className='comments__main'>
        <h3 className='comments__title visually-hidden'>Comments of {taskTitle}</h3>

        <div className='comments__content'>
          <button
            className='comments__btn comments__btn--add'
            onClick={() => {
              setEditorState({ isShow: true })
            }}
          >
            <svg className='svg' width='42' height='42'>
              <use xlinkHref='Task-board/img/sprite.svg#icon-add-comment'></use>
            </svg>
            <span className='visually-hidden'>add new comment</span>
          </button>
          {!Object.hasOwn(comments, taskId) || comments[taskId].length < 1 ? (
            <>
              <p className='comments__empty'>No one has commented yet..</p>
            </>
          ) : (
            <ul className='comments__list'>
              {comments[taskId].map((c) => (
                <li key={c.id} className='comments__item'>
                  <Comment
                    className={'comments__comment'}
                    data={c}
                    editorState={editorState}
                    setEditorState={setEditorState}
                  />
                </li>
              ))}
            </ul>
          )}
          <CommentsEditor
            projectId={projectId}
            taskId={taskId}
            setState={setEditorState}
            state={editorState}
          />
        </div>
      </main>
    </article>
  )
}

export default Comments
