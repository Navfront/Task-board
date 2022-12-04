import { Helmet } from 'react-helmet-async'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BoardColumn, Header } from '../../components'
import { useAppDispatch, useAppSelector } from '../../redux'
import { columnTitles, IProject } from './../../model/data-types'
import { useEffect } from 'react'

function Board(): JSX.Element {
  const { projectId } = useParams()
  const projects = useAppSelector<IProject[]>((state) => state.projectsReducer)
  const project = projects.find((p) => p.id === projectId?.slice(1))
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (project === undefined) {
      navigate('/')
    } else if (projectId !== undefined) {
      dispatch({ type: 'INIT_BOARD', projectId: projectId.slice(1) })
    }
  }, [])

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Tasks board: {project?.title ?? 'undefined'} </title>
      </Helmet>
      <Header>
        <Link to={'/'}>To Main</Link>
        <button
          type='button'
          onClick={() => {
            dispatch({
              type: 'OPEN_MODAL',
              childType: 'EDITOR_CREATE_TASK',
              data: project ?? null
            })
          }}
        >
          New Task
        </button>
        <input className='header__search' type='text' placeholder='SEARCH' />
        <p className='header__project-id'>{project?.title}</p>
      </Header>
      <main className='page__main main main--board'>
        <div className='board'>
          <h1 className='visually-hidden'>Task board: {project?.title}</h1>

          {projectId != null && columnTitles.includes('Queue')
            ? columnTitles.map((title) => (
                <BoardColumn
                  key={title}
                  projectId={projectId.slice(1)}
                  columnTitle={title}
                  classModificator={title.toLowerCase()}
                />
              ))
            : ''}
        </div>
      </main>
    </>
  )
}

export default Board
