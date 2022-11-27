import { MouseEvent, MouseEventHandler } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../redux'

function ProjectsCard(): JSX.Element {
  const dispatch = useAppDispatch()

  const onDeleteHandler: MouseEventHandler<HTMLElement> = (
    event: MouseEvent
  ): void => {
    const target = event.target as HTMLElement
    const id = target.dataset.id ?? ''
    console.log('delete..', id)
    dispatch({ type: 'DELETE', id })
  }

  const onLinkClickHandler: MouseEventHandler<HTMLAnchorElement> = (
    event: MouseEvent
  ): void => {
    const target = event.target as HTMLElement
    if (target.nodeName === 'BUTTON') {
      event.preventDefault()
      return
    }
    console.log('goTo board..')
  }

  return (
    <article className='project-card'>
      <Link
        className='project-card__link'
        to='/board'
        onClick={onLinkClickHandler}
      >
        <h2 className='project-card__title'>Title</h2>
        <time className='project-card__time' dateTime='12/12/2022'>
          Last opened 12.12.2022
        </time>
        <p className='project-card__description'>Description of project...</p>
        <button className='project-card__button' type='button'>
          Enter
        </button>
        <button
          className='project-card__button'
          type='button'
          onClick={onDeleteHandler}
        >
          delete
        </button>
      </Link>
    </article>
  )
}

export default ProjectsCard
