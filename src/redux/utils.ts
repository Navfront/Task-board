import { Item } from '../model/data-types'

export const moveItem = <T extends Item>(state: T[], fromId: string, toId: string): T[] => {
  console.log(fromId, toId)

  const item = state.find((p) => p.id === fromId)
  const itemIndex = state.findIndex((p) => p.id === fromId)
  const target = state.find((p) => p.id === toId)
  const targetIndex = state.findIndex((p) => p.id === toId)
  if (itemIndex >= 0 && targetIndex >= 0 && item != null && target != null) {
    if (itemIndex < targetIndex) {
      return [
        ...state.slice(0, itemIndex),
        target,
        ...state.slice(itemIndex + 1, targetIndex),
        item,
        ...state.slice(targetIndex + 1)
      ]
    } else if (itemIndex > targetIndex) {
      return [
        ...state.slice(0, targetIndex),
        item,
        ...state.slice(targetIndex + 1, itemIndex),
        target,
        ...state.slice(itemIndex + 1)
      ]
    } else return state
  }
  return state
}
