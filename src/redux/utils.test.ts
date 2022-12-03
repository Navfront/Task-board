import { moveItem } from './utils'
const ITEMS = [{ id: '1' }, { id: '2' }, { id: '3' }]

describe('Utils tests', () => {
  test('moveItem test', () => {
    expect(moveItem(ITEMS, '1', '2').findIndex((i) => i.id === '2')).toBe(0)
    expect(moveItem(ITEMS, '1', '1').findIndex((i) => i.id === '2')).toBe(1)
    expect(moveItem(ITEMS, '2', '1').findIndex((i) => i.id === '2')).toBe(0)
  })
})
