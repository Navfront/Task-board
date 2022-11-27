import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Header, Menu, Modal, ProjectsList } from '../../components'

function Main(): JSX.Element {
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Главная страница</title>
      </Helmet>
      <Header>
        <Link to='/board'>To board</Link>
        <Menu />
      </Header>
      <ProjectsList />
      <Modal isOpen>123</Modal>
    </>
  )
}

export default Main
