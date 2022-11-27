interface ActionA {
  type: 'ADD'
  id: string
}
interface ActionB {
  type: 'DELETE'
  id: string
}
interface ActionC {
  type: 'CHANGE_TITLE'
  id: string
}
interface ActionD {
  type: 'UPDATE_LAST_VISIT'
  id: string
}
interface ActionE {
  type: 'UPDATE_DESCRIPTION'
  id: string
}

export type ProjectsActions = ActionA | ActionB | ActionC | ActionD | ActionE
