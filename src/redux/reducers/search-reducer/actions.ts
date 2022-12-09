interface ISearchSet {
  type: 'SEARCH_SET_VALUE'
  value: string
}

interface ISearchDefault {
  type: 'SEARCH_EMPTY'
}

export type SearchActions = ISearchSet | ISearchDefault

export type SearchActionTypes = SearchActions[keyof Pick<SearchActions, 'type'>]
