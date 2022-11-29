import { Link } from 'react-router-dom'
import { IProject } from '../../model/data-types'
import { HumanizeLastDate } from '../../model/utils'
import { useHandlers } from './hooks/use-handlers'

interface IProjectsCardProps {
  project: IProject
}

function ProjectsCard({ project }: IProjectsCardProps): JSX.Element {
  const { onLinkClickHandler, onDeleteHandler, onEditClickHandler } = useHandlers(project)

  return (
    <article className='project-card'>
      <Link className='project-card__link' to='/board' onClick={onLinkClickHandler}>
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
