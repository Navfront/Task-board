import { MOCK_PROJECTS } from '../mock'
import { LocalStorageApi } from './local-storage-api'

let locStoreInstance: LocalStorageApi

beforeAll(() => {
  localStorage.removeItem('test')
})

describe('Testing LocalStorageApi', () => {
  test('Method getInstance works', () => {
    locStoreInstance = LocalStorageApi.getInstance()
    expect(locStoreInstance instanceof LocalStorageApi).toBe(true)
  })

  test('Method getItems return [] on empty LocStor', () => {
    const result = locStoreInstance.getItems('test')
    expect(result.length === 0).toBe(true)
  })

  test('Method setItems return equal getItems', () => {
    locStoreInstance.setItems('test', MOCK_PROJECTS)
    expect(MOCK_PROJECTS).toEqual(locStoreInstance.getItems('test'))
  })

  test('Method updateItemById remove Item from LocStor', () => {
    const response = locStoreInstance.updateItemById('test', MOCK_PROJECTS[0], true)
    const secondResponse = locStoreInstance.updateItemById('test', MOCK_PROJECTS[0], true)
    expect(locStoreInstance.getItems('test').length).toBeGreaterThanOrEqual(2)
    expect(response).toBeTruthy()
    expect(secondResponse).toBeFalsy()
    expect(locStoreInstance.getItems('test').length).toBeLessThan(3)
  })

  test('Method updateItemById can update Item', () => {
    expect(
      locStoreInstance.updateItemById('test', {
        ...MOCK_PROJECTS[1],
        title: 'new'
      })
    ).toBeTruthy()
    expect(locStoreInstance.getItems('test')[0].title).toEqual('new')
  })

  test('Method addItem works', () => {
    expect(locStoreInstance.addItem('test', { id: 'id123' })).toEqual({
      id: 'id123',
      order: 0
    })
    expect(locStoreInstance.updateItemById('test', { id: 'id123' })).toBeTruthy()
  })
})
