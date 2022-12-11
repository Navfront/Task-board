import { ICommentsModalData, ICommentsState } from '../../model/data-types'
import { useAppDispatch, useAppSelector } from '../../redux'
import { IComment } from './../../model/data-types'

interface ICommentsProps {
  data: ICommentsModalData
}

function Comments({ data }: ICommentsProps): JSX.Element {
  const comments = useAppSelector<ICommentsState>((state) => state.commentsReducer)
  const dispatch = useAppDispatch()
  const { projectId, taskId, taskTitle } = data
  const emptyComment: IComment = {
    id: Date.now().toString(),
    userId: null,
    projectId,
    taskId,
    text: '',
    likes: 0,
    children: [],
    parent: null
  }

  return (
    <article className='comments'>
      <header className='comments__header'>
        <span className='comments__task-title'>{taskTitle}</span>
        <button type='button' className='comments__btn comments__btn--close'>
          <svg className='svg' width='42' height='42'>
            <use xlinkHref='img/sprite.svg#icon-close'></use>
          </svg>
          <span className='visually-hidden'>close comments</span>
        </button>
      </header>
      <main className='comments__main'>
        <h3 className='comments__title visually-hidden'>Comments of {taskTitle}</h3>

        <div className='comments__content'>
          {Object.keys(comments).length < 1 && Object.hasOwn(comments, taskId) ? (
            <>
              <p className='comments__empty'>No one has commented yet..</p>
              <button
                className='comments__btn comments__btn--add'
                onClick={() => {
                  dispatch({ type: 'COMMENT_ADD', projectId, taskId, comment: emptyComment })
                }}
              >
                <svg className='svg' width='42' height='42'>
                  <use xlinkHref='img/sprite.svg#icon-add-comment'></use>
                </svg>
                <span className='visually-hidden'>add new comment</span>
              </button>
            </>
          ) : (
            JSON.stringify(comments[taskId])
          )}
        </div>
      </main>
    </article>
  )
}

export default Comments
