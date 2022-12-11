import { LocalStorageCommentsApi } from './local-storage-comments-api'

const lsCommentsApi = LocalStorageCommentsApi.INSTANCE
const projectId = 'p1'
const taskId = 't1'
const newComment = {
  id: '1',
  likes: 0,
  projectId,
  children: [],
  text: 'NEW COMMENT',
  taskId,
  userId: null,
  parent: null
}
const secComment = {
  id: '2',
  likes: 55,
  projectId,
  children: [],
  text: '222 COMMENT',
  taskId,
  userId: null,
  parent: '1'
}
const thirdComment = {
  id: '3',
  likes: 55,
  projectId,
  children: [],
  text: '333 COMMENT',
  taskId,
  userId: null,
  parent: '2'
}
const addEqual = [
  { ...newComment, children: ['2'] },
  { ...secComment, children: ['3'] },
  thirdComment
]
const updateEqual = [
  { ...newComment, children: ['2'], likes: 99 },
  { ...secComment, children: ['3'] },
  thirdComment
]
const updatedComment = { ...newComment, likes: 99 }

beforeAll(() => {
  localStorage.clear()
  lsCommentsApi.add(projectId, taskId, newComment)
  lsCommentsApi.add(projectId, taskId, secComment)
  lsCommentsApi.add(projectId, taskId, thirdComment)
})

describe('Testing Comments LocalStorage Api', () => {
  test('Add and Get works', () => {
    expect(lsCommentsApi.get(projectId, taskId)).toEqual(addEqual)
  })
  test('Update works', () => {
    expect(lsCommentsApi.update(projectId, taskId, updatedComment)).toBeTruthy()
    expect(lsCommentsApi.get(projectId, taskId)).toEqual(updateEqual)
  })
  test('Delete works', () => {
    lsCommentsApi.delete(projectId, taskId, secComment)
    expect(lsCommentsApi.get(projectId, taskId)).toEqual([{ ...updatedComment, children: [] }])
  })
})
