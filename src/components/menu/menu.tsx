import { useHandlers } from './hooks/use-handlers'

function Menu(): JSX.Element {
  const { onCreateClickHandler } = useHandlers()

  return (
    <ul className='menu'>
      <li>
        <button type='button' className='menu__button' onClick={onCreateClickHandler}>
          Create New Project
        </button>
      </li>
    </ul>
  )
}

export default Menu
