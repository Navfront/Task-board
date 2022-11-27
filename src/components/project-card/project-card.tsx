import { Link } from 'react-router-dom'

function ProjectsCard(): JSX.Element {
  return (
    <article className='project-card'>
      <Link className='project-card__link' to='/board'>
        <h2 className='project-card__title'>Title</h2>
        <time className='project-card__time' dateTime='12/12/2022'>
          Last opened 12.12.2022
        </time>
        <p className='project-card__description'>Description of project...</p>
        <button className='project-card__button' type='button'>
          Enter
        </button>
        <button className='project-card__button' type='button'>
          delete
        </button>
      </Link>
    </article>
  )
}

export default ProjectsCard
