import { columnTitles } from './../board-column/board-column'
import { useState } from 'react'

interface ITaskProps {
  taskId: string
  order: number
  title: string
  description: string
  createdDate: Date
  inWork: number
  doneDate: null | Date
  priority: 'low' | 'mid' | 'hi'
  files: FileReader[]
  status: typeof columnTitles[number]
  subTasks: string[]
}

function Task(task: ITaskProps): JSX.Element {
  const [isExpand, setIsExpand] = useState<boolean>(false)

  const onExpandClickHandler = (): void => {
    setIsExpand(!isExpand)
  }

  return (
    <article className={`task task--priority-${task.priority}`}>
      <h3 className='task__title'>Title</h3>
      <button
        type='button'
        className={`task__expand-button ${isExpand ? 'task__expand-button--active' : ''}`}
        onClick={onExpandClickHandler}
      >
        {isExpand ? 'Свернуть' : 'Развернуть'}
      </button>
      <div className={`task__expander ${isExpand ? 'task__expander--active' : ''}`}>
        <p>
          <span>Created: {task.createdDate.toDateString()}</span>
          <span>In work: {task.inWork} ms</span>
        </p>

        <ul className='task__sub-list'>
          <li className='task__sub-item'>Subtask 1</li>
          <li className='task__sub-item'>Subtask 2</li>
          <li className='task__sub-item'>Subtask 3</li>
        </ul>

        <ul className='task__files files'>
          <li className='files-list__item'>file</li>
        </ul>

        <p className='task__comments-counter'>
          Comments: 324 <button type='button'>Read comments</button>
        </p>
      </div>
    </article>
  )
}

export default Task
