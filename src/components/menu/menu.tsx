import { useHandlers } from './hooks/use-handlers'
import sprite from '../../resources/sprite.svg'

function Menu(): JSX.Element {
  const { onCreateClickHandler } = useHandlers()

  return (
    <ul className='menu'>
      <li>
        <button
          type='button'
          className='menu__button menu__button--new'
          onClick={onCreateClickHandler}
        >
          New Project
          <svg className='svg' width='42' height='42'>
            <use xlinkHref={sprite + '#icon-add'}></use>
          </svg>
        </button>
      </li>
    </ul>
  )
}

export default Menu
