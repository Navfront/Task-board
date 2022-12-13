import { useAppDispatch } from './../../redux/index'
import sprite from '../../resources/sprite.svg'

interface ICommentsButtonProps {
  projectId: string
  taskId: string
  taskTitle: string
  className?: string
}

function CommentsButton({
  className,
  taskId,
  projectId,
  taskTitle
}: ICommentsButtonProps): JSX.Element {
  const dispatch = useAppDispatch()
  return (
    <button
      type='button'
      className={`${className ?? ''} comments-button`}
      onClick={() => {
        dispatch({ type: 'COMMENTS_INIT', projectId, taskId })
        dispatch({
          type: 'OPEN_MODAL',
          childType: 'COMMENTS',
          data: { taskId, projectId, taskTitle }
        })
      }}
    >
      <svg className='svg' width='30' height='30'>
        <use xlinkHref={sprite + '#icon-comments'}></use>
      </svg>
      <span className='visually-hidden'>open comments modal</span>
    </button>
  )
}

export default CommentsButton
