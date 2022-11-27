import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { Header, ProjectsList } from '../../components'

function Main(): JSX.Element {
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Главная страница</title>
      </Helmet>
      <Header>
        <Link to='/board'>To board</Link>
      </Header>
      <ProjectsList />
    </>
  )
}

export default Main
