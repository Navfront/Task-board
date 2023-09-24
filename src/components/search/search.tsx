import { ChangeEvent, FormEvent, useState } from 'react'
import { useAppDispatch } from './../../redux/index'
import sprite from '../../resources/sprite.svg'

function Search(): JSX.Element {
  const [searchValue, setSearchValue] = useState<string>('')
  const dispatch = useAppDispatch()

  const onSearchChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value)
  }

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    if (searchValue.length > 0) {
      dispatch({ type: 'SEARCH_SET_VALUE', value: searchValue })
    } else {
      dispatch({ type: 'SEARCH_EMPTY' })
    }
  }

  const onInputChangeHandler = (event: any): void => {
    dispatch({ type: 'SEARCH_SET_VALUE', value: event.target.value })
  }

  return (
    <form className='board-search' onSubmit={onSubmitHandler}>
      <label className='board-search__label' htmlFor='board-search__input'>
        <svg className='svg' width='42' height='42'>
          <use xlinkHref={sprite + '#icon-search'}></use>
        </svg>
      </label>
      <input
        id='board-search__input'
        className={`board-search__input ${
          searchValue.length > 1 ? 'board-search__input--active' : ''
        }`}
        type='search'
        value={searchValue}
        onChange={onSearchChangeHandler}
        onInput={onInputChangeHandler}
        placeholder='SEARCH'
      />
      <button type='submit' className='visually-hidden'>
        search
      </button>
    </form>
  )
}
export default Search
