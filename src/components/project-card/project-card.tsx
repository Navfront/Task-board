import { Link } from 'react-router-dom'
import { Project } from '../../model/data-types'
import { HumanizeLastDate } from '../../model/utils'
import { useHandlers } from './hooks/use-handlers'

interface ProjectsCardProps {
  project: Project
}

function ProjectsCard({ project }: ProjectsCardProps): JSX.Element {
  const { onLinkClickHandler, onDeleteHandler } = useHandlers(project)

  return (
    <article className='project-card'>
      <Link
        className='project-card__link'
        to='/board'
        onClick={onLinkClickHandler}
      >
        <h2 className='project-card__title'>{project.title}</h2>
        <time
          className='project-card__time'
          dateTime={project.time?.toISOString()}
        >
          {HumanizeLastDate(project.time)}
        </time>
        <p className='project-card__description'>Description of project...</p>
        <button className='project-card__button' type='button'>
          Enter
        </button>
        <button
          className='project-card__button'
          type='button'
          onClick={onDeleteHandler}
          data-id={project.id}
        >
          delete
        </button>
      </Link>
    </article>
  )
}

export default ProjectsCard
