import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import { Header } from '../../components'

function Board(): JSX.Element {
  const { projectId } = useParams()

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Tasks board: {projectId?.slice(1)} </title>
      </Helmet>
      <Header>
        <Link to={'/'}>To Main</Link>
        <button type='button'>New Task</button>
        <input className='header__search' type='text' placeholder='SEARCH' />
        <p className='header__project-id'>{`Project id: ${projectId?.slice(1) ?? ''}`}</p>
      </Header>
      <main className='page__main main main--board'>
        <div className='board'>
          <section className='column column__alpha'>
            <h2 className='column__title'>Queue</h2>
            <ul className='column__list'>
              <li className='column__item'>
                <div className='task'>
                  <h3 className='task__title'>Title</h3>
                </div>
              </li>
            </ul>
          </section>
          <section className='column column__betta'>
            <h2 className='column__title'>Development</h2>
            <ul className='column__list'>
              <li className='column__item'>
                <div className='task'>
                  <h3 className='task__title'>Title</h3>
                </div>
              </li>
            </ul>
          </section>
          <section className='column column__gamma'>
            <h2 className='column__title'>Done</h2>
            <ul className='column__list'>
              <li className='column__item'>
                <div className='task'>
                  <h3 className='task__title'>Title</h3>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </>
  )
}

export default Board
