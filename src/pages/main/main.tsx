import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Header, Menu, Modal, ProjectsList } from '../../components'
import { useAppDispatch } from '../../redux'

function Main(): JSX.Element {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch({ type: 'INIT_APP' })
  }, [])

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
      <Modal />
    </>
  )
}

export default Main
