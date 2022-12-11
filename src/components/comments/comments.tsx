import { ICommentsModalData, ICommentsState } from '../../model/data-types'
import { useAppDispatch, useAppSelector } from '../../redux'
import Comment from '../comment/comment'
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
  console.log(comments)

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
            <use xlinkHref='img/sprite.svg#icon-close'></use>
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
              dispatch({ type: 'COMMENT_ADD', projectId, taskId, comment: emptyComment })
            }}
          >
            <svg className='svg' width='42' height='42'>
              <use xlinkHref='img/sprite.svg#icon-add-comment'></use>
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
                  <Comment className={'comments__comment'} data={c} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </article>
  )
}

export default Comments
