import { ChangeEvent, useState } from 'react'

function Search(): JSX.Element {
  const [searchValue, setSearchValue] = useState<string>('')

  const onSearchChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value)
  }

  return (
    <div className='board-search'>
      <label className='board-search__label' htmlFor='board-search__input'>
        <svg className='svg' width='42' height='42'>
          <use xlinkHref='img/sprite.svg#icon-search'></use>
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
        placeholder='SEARCH'
      />
    </div>
  )
}
export default Search
