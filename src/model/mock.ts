import { Project } from './data-types'

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Мой первый проект',
    description: 'Создал для тестирования логики при создании различных ToDo',
    newComments: 0,
    time: new Date(),
    userId: '123'
  },
  {
    id: '2',
    title: 'Мой второй проект',
    description: 'Создал чтобы удалить. ',
    newComments: 0,
    time: null,
    userId: '123'
  },
  {
    id: '3',
    title: 'Мой третий проект',
    description: 'Проверяем переполнение, верстку',
    newComments: 0,
    time: new Date(),
    userId: '123'
  }
]
