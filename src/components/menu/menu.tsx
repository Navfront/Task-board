import { useAppDispatch } from './../../redux/index'

function Menu(): JSX.Element {
  const dispatch = useAppDispatch()

  const onCreateClickHandler = (): void => {
    dispatch({ type: 'OPEN_MODAL', payload: { isOpen: true } })
  }

  return (
    <ul className='menu'>
      <li>
        <button
          type='button'
          className='menu__button'
          onClick={onCreateClickHandler}
        >
          Create New Project
        </button>
      </li>
    </ul>
  )
}

export default Menu
