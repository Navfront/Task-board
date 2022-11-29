import { IUser } from './app-reducer'

interface IAppActionInit {
  type: 'INIT_APP'
}

interface IAppActionSetUser {
  type: 'SET_APP_USER'
  user: IUser
}

export type AppActions = IAppActionInit | IAppActionSetUser

export type AppActionTypes = AppActions[keyof Pick<AppActions, 'type'>]
