import { buildCommentsTree } from '../utils'

const comments = [
  {
    id: '1',
    likes: 0,
    projectId: 'p1',
    children: ['2'],
    text: 'NEW COMMENT',
    taskId: 't1',
    userId: null,
    parent: null
  },
  {
    id: '2',
    likes: 22,
    projectId: 'p1',
    children: ['3', '4'],
    text: '222 COMMENT',
    taskId: 't1',
    userId: null,
    parent: '1'
  },
  {
    id: '3',
    likes: 55,
    projectId: 'p1',
    children: [],
    text: '333 COMMENT',
    taskId: 't1',
    userId: null,
    parent: '2'
  },
  {
    id: '4',
    likes: 534,
    projectId: 'p1',
    children: [],
    text: '444 COMMENT',
    taskId: 't1',
    userId: null,
    parent: '2'
  }
]

const eq = {
  task1: [
    {
      id: '1',
      likes: 0,
      projectId: 'p1',
      children: [
        {
          id: '2',
          likes: 22,
          projectId: 'p1',
          children: [
            {
              id: '3',
              likes: 55,
              projectId: 'p1',
              children: [],
              text: '333 COMMENT',
              taskId: 't1',
              userId: null,
              parent: null
            },
            {
              id: '4',
              likes: 534,
              projectId: 'p1',
              children: [],
              text: '444 COMMENT',
              taskId: 't1',
              userId: null,
              parent: null
            }
          ],
          text: '222 COMMENT',
          taskId: 't1',
          userId: null,
          parent: null
        }
      ],
      text: 'NEW COMMENT',
      taskId: 't1',
      userId: null,
      parent: null
    }
  ]
}

describe('Test Utils', () => {
  test('Building Comments Tree', () => {
    expect(buildCommentsTree(comments, 'task1')).toEqual(eq)
  })
})
