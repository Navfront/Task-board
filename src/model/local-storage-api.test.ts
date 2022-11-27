import { LocalStorageApi } from './local-storage-api'
import { MOCK_PROJECTS } from './mock'

let locStoreInstance: LocalStorageApi

beforeAll(() => {
  localStorage.removeItem('Items')
})

describe('Testing LocalStorageApi', () => {
  test('Method getInstance works', () => {
    locStoreInstance = LocalStorageApi.getInstance()
    expect(locStoreInstance instanceof LocalStorageApi).toBe(true)
  })

  test('Method getItems return [] on empty LocStor', () => {
    const result = locStoreInstance.getItems('project')
    expect(result.length === 0).toBe(true)
  })

  test('Method setItems return equal getItems', () => {
    locStoreInstance.setItems('project', MOCK_PROJECTS)
    expect(MOCK_PROJECTS).toEqual(locStoreInstance.getItems('project'))
  })

  test('Method updateItemById remove Item from LocStor', () => {
    const response = locStoreInstance.updateItemById(
      'project',
      MOCK_PROJECTS[0],
      true
    )
    const secondResponse = locStoreInstance.updateItemById(
      'project',
      MOCK_PROJECTS[0],
      true
    )
    expect(locStoreInstance.getItems('project').length).toBeGreaterThanOrEqual(
      2
    )
    expect(response).toBeTruthy()
    expect(secondResponse).toBeFalsy()
    expect(locStoreInstance.getItems('project').length).toBeLessThan(3)
  })

  test('Method updateItemById can update Item', () => {
    expect(
      locStoreInstance.updateItemById('project', {
        ...MOCK_PROJECTS[1],
        title: 'new'
      })
    ).toBeTruthy()
    expect(locStoreInstance.getItems('project')[0].title).toEqual('new')
  })
})
