import { Reducer } from 'react'
import { SearchActions } from './actions'

const searchState = {
  value: ''
}

export type SearchState = typeof searchState

export const searchReducer: Reducer<SearchState, SearchActions> = (
  state: SearchState = searchState,
  action
) => {
  switch (action.type) {
    case 'SEARCH_SET_VALUE':
      return { value: action.value }
    case 'SEARCH_EMPTY':
      return { ...searchState }
    default:
      return state
  }
}
