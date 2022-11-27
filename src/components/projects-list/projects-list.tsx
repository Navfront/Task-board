import { ProjectsCard } from '..'

function ProjectsList(): JSX.Element {
  return (
    <ul className='projects-list'>
      <li>
        <ProjectsCard />
      </li>
    </ul>
  )
}

export default ProjectsList
