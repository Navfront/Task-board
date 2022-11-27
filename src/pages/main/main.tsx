import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

function Main(): JSX.Element {
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Главная страница</title>
      </Helmet>
      <div>
        main
        <p>
          <Link to='/board'>To board</Link>
        </p>
      </div>
    </>
  )
}

export default Main
