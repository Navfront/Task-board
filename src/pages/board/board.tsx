/* eslint-disable multiline-ternary */
import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import { BoardColumn, columnTitles, Header } from '../../components'
import { useAppSelector } from '../../redux'
import { IProject } from './../../model/data-types'

function Board(): JSX.Element {
  const { projectId } = useParams()
  const projects = useAppSelector<IProject[]>((state) => state.projectsReducer)
  const project = projects.find((p) => p.id === projectId?.slice(1))

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Tasks board: {project?.title ?? 'undefined'} </title>
      </Helmet>
      <Header>
        <Link to={'/'}>To Main</Link>
        <button type='button'>New Task</button>
        <input className='header__search' type='text' placeholder='SEARCH' />
        <p className='header__project-id'>{project?.title}</p>
      </Header>
      <main className='page__main main main--board'>
        <div className='board'>
          <h1 className='visually-hidden'>Task board: {project?.title}</h1>
          {project !== undefined ? (
            <>
              {columnTitles.map((title) => (
                <BoardColumn
                  key={title}
                  columnTitle={title}
                  classModificator={title.toLowerCase()}
                />
              ))}
            </>
          ) : (
            <p style={{ justifySelf: 'center', gridColumn: 'span 3' }}>
              Error! Project is not created yet!
            </p>
          )}
        </div>
      </main>
    </>
  )
}

export default Board
