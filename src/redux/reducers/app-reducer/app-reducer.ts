import { Reducer } from 'react'
import { IAppActions } from './actions'

export interface IUser {
  id: string
}

export interface IAppState {
  user: IUser
  isTouch: boolean
}

const initialAppState: IAppState = {
  user: { id: '' },
  isTouch: false
}

export const appReducer: Reducer<IAppState, IAppActions> = (
  state: IAppState = initialAppState,
  action
) => {
  switch (action.type) {
    case 'INIT_APP':
      return state

    case 'SET_APP_USER':
      return { ...state, user: action.user }

    default:
      return state
  }
}