import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { ProjectsCard } from '..'
import { IProject } from '../../model/data-types'
import { useAppSelector } from './../../redux/index'

function ProjectsList(): JSX.Element {
  const projects = useAppSelector<IProject[]>((state) => state.projectsReducer)

  const isMobile = window.innerWidth < 600
  const userAgent = navigator.userAgent ?? navigator.vendor
  const isIOS = /iPad|iPhone|iPod/.test(userAgent)

  return (
    <DndProvider backend={isMobile && !isIOS ? TouchBackend : HTML5Backend}>
      {projects.length > 0 ? (
        <ul className='projects-list'>
          {projects.map((project) => {
            return (
              <li key={'project' + project.id}>
                <ProjectsCard project={project} />
              </li>
            )
          })}
        </ul>
      ) : (
        <p className='projects-list-empty'>Create new Project</p>
      )}
    </DndProvider>
  )
}

export default ProjectsList
