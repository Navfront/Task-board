import { ICommentsModalData, ICommentsState } from '../../model/data-types'
import { useAppSelector } from '../../redux'

interface ICommentsProps {
  data: ICommentsModalData
}

function Comments({ data }: ICommentsProps): JSX.Element {
  const comments = useAppSelector<ICommentsState>((state) => state.commentsReducer)

  return (
    <article className='comments'>
      <header className='comments__header'>
        <span className='comments__task-title'>{data.taskTitle}</span>
        <button type='button' className='comments__btn comments__btn--close'>
          <svg className='svg' width='42' height='42'>
            <use xlinkHref='img/sprite.svg#icon-close'></use>
          </svg>
          <span className='visually-hidden'>close comments</span>
        </button>
      </header>
      <main className='comments__main'>
        <h3 className='comments__title visually-hidden'>Comments of {data.taskTitle}</h3>

        <div className='comments__content'>
          {Object.keys(comments).length < 1 ? (
            <>
              <p className='comments__empty'>No one has commented yet..</p>
              <button className='comments__btn comments__btn--add'>
                <svg className='svg' width='42' height='42'>
                  <use xlinkHref='img/sprite.svg#icon-add-comment'></use>
                </svg>
                <span className='visually-hidden'>add new comment</span>
              </button>
            </>
          ) : (
            JSON.stringify(comments)
          )}
        </div>
      </main>
    </article>
  )
}

export default Comments
