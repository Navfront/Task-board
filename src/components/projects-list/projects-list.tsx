import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ProjectsCard } from '..'
import { IProject } from '../../model/data-types'
import { useAppSelector } from './../../redux/index'

function ProjectsList(): JSX.Element {
  const projects = useAppSelector<IProject[]>((state) => state.projectsReducer)

  return (
    <DndProvider backend={HTML5Backend}>
      <ul className='projects-list'>
        {projects.map((project) => {
          return (
            <li key={'project' + project.id}>
              <ProjectsCard project={project} />
            </li>
          )
        })}
      </ul>
    </DndProvider>
  )
}

export default ProjectsList
