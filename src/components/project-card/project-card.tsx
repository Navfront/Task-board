import { useDrag, useDrop } from 'react-dnd'
import { Link } from 'react-router-dom'
import { dNDItemTypes } from '../../dnd/item-types'
import { IProject } from '../../model/data-types'
import { HumanizeLastDate } from '../../model/utils'
import { useHandlers } from './hooks/use-handlers'

interface IProjectsCardProps {
  project: IProject
}

function ProjectsCard({ project }: IProjectsCardProps): JSX.Element {
  const { onLinkClickHandler, onDeleteHandler, onEditClickHandler } = useHandlers(project)
  const [{ isDragging }, drag] = useDrag(() => ({
    type: dNDItemTypes.PROJECT,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))
  const [{ isOver }, drop] = useDrop(() => ({
    accept: dNDItemTypes.PROJECT,
    drop: () => {
      console.log('DROP', drop)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  return (
    <article
      className='project-card'
      ref={(node) => drag(drop(node))}
      style={{ opacity: isDragging ? 0.5 : 1, border: isOver ? '1px solid red' : 'none' }}
    >
      <Link className='project-card__link' to={`/board:${project.id}`} onClick={onLinkClickHandler}>
        <h2 className='project-card__title'>{project.title}</h2>
        <time className='project-card__time' dateTime={project.time?.toISOString()}>
          {HumanizeLastDate(project.time)}
        </time>
        <p className='project-card__description'>{project.description}</p>
        <button className='project-card__button' type='button' onClick={onEditClickHandler}>
          Edit
        </button>
        <button className='project-card__button' type='button' onClick={onDeleteHandler}>
          Delete
        </button>
      </Link>
    </article>
  )
}

export default ProjectsCard
