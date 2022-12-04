import React, { useState } from 'react'
import { columnTitles, ITask } from '../../model/data-types'

interface ITaskProps extends ITask {
  id: string
  order: number
  title: string
  description: string
  createdDate: Date
  inWork: number
  doneDate: null | Date
  files: FileReader[]
  status: typeof columnTitles[number]
  subTasks: string[]
}

function Task(task: ITaskProps): JSX.Element {
  const [isExpand, setIsExpand] = useState<boolean>(false)
  const expanderRef = React.createRef<HTMLDivElement>()
  const contentRef = React.createRef<HTMLDivElement>()
  const onExpandClickHandler = (): void => {
    setIsExpand(!isExpand)
    if (expanderRef.current !== null && contentRef.current !== null) {
      if (!isExpand) {
        expanderRef.current.style.height = String(contentRef.current.clientHeight) + 'px'
      } else {
        expanderRef.current.style.height = '1px'
      }
    }
  }

  return (
    <article className={`task task--priority-${task.priority}`} onClick={onExpandClickHandler}>
      <h3 className='task__title'>{task.title}</h3>
      <p className='task__description'>{task.description}</p>
      <button
        type='button'
        className={`task__expand-button ${!isExpand ? 'task__expand-button--active' : ''}`}
        onClick={onExpandClickHandler}
      >
        {isExpand ? 'Свернуть' : 'Развернуть'}
      </button>
      <div
        ref={expanderRef}
        className={`task__expander ${!isExpand ? 'task__expander--active' : ''}`}
      >
        <div ref={contentRef} className='task__content'>
          <p>
            <span>Created: {JSON.stringify(task.createdDate)}</span>
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
      </div>
    </article>
  )
}

export default Task
