import { ProjectsCard } from '..'
import { Project } from '../../model/data-types'
import { useAppDispatch, useAppSelector } from './../../redux/index'
import { useEffect } from 'react'

function ProjectsList(): JSX.Element {
  const projects = useAppSelector<Project[]>((state) => state.projectsReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch({ type: 'INIT_PROJECTS' })
  }, [])

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
