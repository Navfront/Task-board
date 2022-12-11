import { IExComment } from './../../model/data-types'

interface ICommentProps {
  className: string
  data: IExComment
}

function Comment({ className, data }: ICommentProps): JSX.Element {
  const { likes, text, userId, children } = data
  return (
    <>
      <article className={`${className} comment`}>
        <header className='comment__header'>
          <button type='button'>like</button>
          <span>{likes}</span>

          <button type='button'>dislike</button>
          <span>{userId}</span>
        </header>
        <div className='comment__content'>{text}</div>
      </article>
      {children.length > 0 && (
        <ul className='comment__sub-comment-list'>
          {children.map((child) => (
            <li className='comment__sub-comment-item' key={child.id}>
              <Comment className={className} data={child} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default Comment
