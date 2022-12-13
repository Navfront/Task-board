import { Helmet } from 'react-helmet-async'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BoardColumn, Header } from '../../components'
import { useAppDispatch, useAppSelector } from '../../redux'
import { COLUMN_TITLES, IProject } from './../../model/data-types'
import React, { useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import Search from '../../components/search/search'
import sprite from '../../resources/sprite.svg'

function Board(): JSX.Element {
  const { projectId } = useParams()
  const projects = useAppSelector<IProject[]>((state) => state.projectsReducer)
  const project = projects.find((p) => p.id === projectId?.slice(1))
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const isMobile = window.innerWidth < 600
  const userAgent = navigator.userAgent ?? navigator.vendor
  const isIOS = /iPad|iPhone|iPod/.test(userAgent)

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
        <nav className='navigation'>
          <ul className='navigation__list'>
            <li className='navigation__item'>
              <Link to={'/'} className='navigation__link'>
                <svg className='svg' width='42' height='42'>
                  <use xlinkHref={sprite + '#icon-home'}></use>
                </svg>
                <span className='visually-hidden'>To main page</span>
              </Link>
            </li>
          </ul>
        </nav>
        <ul className='board-controls'>
          <li className='board-controls__item'>
            <button
              className='board-controls__add-btn'
              type='button'
              onClick={() => {
                dispatch({
                  type: 'OPEN_MODAL',
                  childType: 'EDITOR_CREATE_TASK',
                  data: project ?? null
                })
              }}
            >
              <svg className='svg' width='42' height='42'>
                <use xlinkHref={sprite + '#icon-add'}></use>
              </svg>
              <span className='visually-hidden'>Add new task</span>
            </button>
          </li>
          <li className='board-controls__item'>
            <Search />
          </li>
        </ul>

        <p className='header__project-id'>
          <span>Project&nbsp;name:</span> <span>{project?.title}</span>
        </p>
      </Header>
      <main className='page__main main main--board'>
        <div className='board'>
          <h1 className='visually-hidden'>Task board: {project?.title}</h1>
          <DndProvider backend={isMobile && !isIOS ? TouchBackend : HTML5Backend}>
            {projectId != null && COLUMN_TITLES.includes('Queue')
              ? COLUMN_TITLES.map((title) => (
                  <BoardColumn
                    key={title}
                    projectId={projectId.slice(1)}
                    columnTitle={title}
                    classModificator={title.toLowerCase()}
                  />
                ))
              : ''}
          </DndProvider>
        </div>
      </main>
    </>
  )
}

export default React.memo(Board)
