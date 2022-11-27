import { ProjectsCard } from '..'
import { Project } from '../../model/data-types'
import { useAppSelector } from './../../redux/index'

function ProjectsList(): JSX.Element {
  const projects = useAppSelector<Project[]>((state) => state.projectsReducer)
  console.log(projects)

  return (
    <ul className='projects-list'>
      {projects.map((project) => {
        return (
          <li key={'project' + project.id}>
            <ProjectsCard project={project} />
          </li>
        )
      })}
    </ul>
  )
}

export default ProjectsList
