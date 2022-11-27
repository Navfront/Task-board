import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Header } from '../../components'

function Board(): JSX.Element {
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Доска задач</title>
      </Helmet>
      <Header>
        <Link to={'/'}>To Main</Link>
      </Header>
      <div>board</div>
    </>
  )
}

export default Board
