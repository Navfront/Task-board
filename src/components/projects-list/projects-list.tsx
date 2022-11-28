import { ProjectsCard } from '..'
import { Project } from '../../model/data-types'
import { useAppDispatch, useAppSelector } from './../../redux/index'
import { useEffect, useState } from 'react'
import { ProjectsApiFacade } from '../../model/service/projects-api-facade'

function ProjectsList(): JSX.Element {
  const projects = useAppSelector<Project[]>((state) => state.projectsReducer)
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    ProjectsApiFacade.projectsQueryApi
      .get()
      .then((data) => {
        console.log(data)
        setIsLoading(false)
        dispatch({ type: 'GET_ALL_PROJECTS', projects: data })
      })
      .catch(console.log)
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

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
