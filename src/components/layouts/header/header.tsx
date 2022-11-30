import { PropsWithChildren } from 'react'

function Header({ children }: PropsWithChildren): JSX.Element {
  return <header className='page__header header'>{children}</header>
}

export default Header
