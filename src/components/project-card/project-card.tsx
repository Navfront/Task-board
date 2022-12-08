import { useDrag, useDrop } from 'react-dnd'
import { Link } from 'react-router-dom'
import { dNDItemTypes } from '../../dnd/item-types'
import { IProject } from '../../model/data-types'
import { HumanizeLastDate } from '../../model/utils'
import { useAppDispatch } from '../../redux'
import { useHandlers } from './hooks/use-handlers'

interface IProjectsCardProps {
  project: IProject
}

function ProjectsCard({ project }: IProjectsCardProps): JSX.Element {
  const projectItem = { type: dNDItemTypes.PROJECT, id: project.id }
  const { onLinkClickHandler, onDeleteHandler, onEditClickHandler } = useHandlers(project)
  const dispatch = useAppDispatch()

  // DRAG
  const [{ isDragging }, drag] = useDrag(() => ({
    item: projectItem,
    end(draggedItem, monitor) {
      const fromId = draggedItem.id
      const toId = monitor.getDropResult<any>().id as string
      console.log('end', draggedItem, monitor.getItem())
      console.log(monitor.getDropResult())
      dispatch({ type: 'MOVE_PROJECT', move: { fromId, toId } })
    },
    type: dNDItemTypes.PROJECT,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  // DROP
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: dNDItemTypes.PROJECT,
    drop: () => projectItem,
    canDrop(item, monitor) {
      const i = item as typeof projectItem
      return i.id !== project.id
    },
    collect: (monitor) => ({
      item: monitor.getItem(),
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  }))

  return (
    <article
      className='project-card'
      ref={(node) => drag(drop(node))}
      style={{
        opacity: isDragging ? 0.3 : 1,
        outline: isOver ? (canDrop ? '1px solid lightgreen' : '1px solid red') : 'none',
        outlineOffset: '-1px'
      }}
    >
      <h2 className='project-card__title'>{project.title}</h2>
      <time className='project-card__time' dateTime={project.time?.toISOString()}>
        {HumanizeLastDate(project.time)}
      </time>
      <p className='project-card__description'>{project.description}</p>
      <Link
        className='project-card__link'
        to={isDragging ? '' : `/board:${project.id}`}
        onClick={onLinkClickHandler}
        style={{ display: isDragging ? 'contents' : 'block' }}
      >
        <svg className='svg' width='42' height='42'>
          <use xlinkHref='img/sprite.svg#icon-forward'></use>
        </svg>
      </Link>

      <div className='project-card__controls-wrapper'>
        <button
          className='project-card__button project-card__button--settings'
          type='button'
          title='edit'
          onClick={onEditClickHandler}
        >
          <svg className='svg' width='42' height='42'>
            <use xlinkHref='img/sprite.svg#icon-settings'></use>
          </svg>
          <span className='visually-hidden'>Edit</span>
        </button>
        <button
          className='project-card__button project-card__button--delete'
          title='delete'
          type='button'
          onClick={onDeleteHandler}
        >
          <svg className='svg' width='42' height='42'>
            <use xlinkHref='img/sprite.svg#icon-delete'></use>
          </svg>
          <span className='visually-hidden'>Delete</span>
        </button>
      </div>
    </article>
  )
}

export default ProjectsCard
