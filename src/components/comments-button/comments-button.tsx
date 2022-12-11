import { useAppSelector } from '../../redux'
import { ICommentsState } from './../../model/data-types'

interface ICommentsButtonProps {
  className?: string
}

function CommentsButton({ className }: ICommentsButtonProps): JSX.Element {
  const comments = useAppSelector<ICommentsState>((state) => state.commentsReducer)
  console.log(comments)

  return (
    <button type='button' className={`${className ?? ''} comments-button`}>
      <svg className='svg' width='30' height='30'>
        <use xlinkHref='img/sprite.svg#icon-comments'></use>
      </svg>
      <span className='visually-hidden'>open comments modal</span>
    </button>
  )
}

export default CommentsButton
