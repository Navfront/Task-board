import { PropsWithChildren } from 'react'

function Header({ children }: PropsWithChildren): JSX.Element {
  return <header className='header'>{children}</header>
}

export default Header
