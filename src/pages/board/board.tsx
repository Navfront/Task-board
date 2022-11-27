import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

function Board(): JSX.Element {
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Главная страница</title>
      </Helmet>
      <div>
        board
        <p>
          <Link to={'/'}>To Main</Link>
        </p>
      </div>
    </>
  )
}

export default Board
