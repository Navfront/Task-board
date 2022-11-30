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
      </Header>
      <main className='page__main main'>
        <div className='board'>board</div>
      </main>
    </>
  )
}

export default Board
