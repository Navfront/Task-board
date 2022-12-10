import React, { useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { BoardItems, COLUMN_TITLES, ISubTask, ITask } from '../../model/data-types'
import { useAppDispatch } from './../../redux/index'
import { dNDItemTypes } from './../../dnd/item-types'
import SubTask from './../sub-task/sub-task'

export interface TaskItemDnd {
  taskId: string
  currentStatus: string
}
export interface ITaskProps extends ITask {
  id: string
  order: number
  title: string
  description: string
  createdDate: Date
  inWork: number
  doneDate: null | Date
  files: FileReader[]
  status: typeof COLUMN_TITLES[number]
  subTasks: ISubTask[]
  projectId: string
}

const isITask = (item: BoardItems): item is ITask => {
  return Object.hasOwn(item, 'status')
}

function Task(task: ITaskProps): JSX.Element {
  const [isExpand, setIsExpand] = useState<boolean>(false)
  const expanderRef = React.createRef<HTMLDivElement>()
  const contentRef = React.createRef<HTMLDivElement>()
  const dispatch = useAppDispatch()

  const [{ isDragging }, drag] = useDrag(() => ({
    end(item, monitor) {
      const dropResult = monitor.getDropResult<BoardItems>()
      console.log(123)

      if (dropResult !== null) {
        if (!isITask(dropResult)) {
          dispatch({
            type: 'MOVE_BOARD_TASK',
            projectId: dropResult.projectId,
            task,
            position: { current: task.status, moveTo: dropResult.columnTitle }
          })
        } else {
          dispatch({
            type: 'MOVE_BOARD_TASK',
            task,
            projectId: task.projectId,
            position: { current: task.status, moveTo: dropResult.status, toTaskId: dropResult.id }
          })
        }
      }
    },
    item: task,
    type: dNDItemTypes.TASK,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      item: monitor.getDropResult<ITask>()
    })
  }))

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: dNDItemTypes.TASK,
    drop() {
      return task
    },
    canDrop(item) {
      const i = item as ITask
      return task.id !== i.id
    },
    collect: (monitor) => {
      return {
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop()
      }
    }
  }))

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

  const onEditorOpenHandler = (): void => {
    dispatch({
      type: 'OPEN_MODAL',
      data: { ...task, projectId: task.projectId },
      childType: 'EDITOR_EDIT_TASK'
    })
  }

  return (
    <article
      ref={(node) => drag(drop(node))}
      className={`task task--priority-${task.priority}`}
      style={{
        opacity: isDragging ? 0.3 : 1,
        outlineOffset: '-3px',
        outline: isOver ? `3px solid ${canDrop ? 'lightgreen' : 'red'}` : 'none'
      }}
    >
      <header className='task__header'>
        <span className='task__index'>{`#${task.index}`}</span>
        <time className='task__time' dateTime={new Date(task.createdDate).toISOString()}>
          Created: {new Date(task.createdDate).toLocaleString()}
        </time>
        <span className='task__in-work'>In work: {task.inWork} ms</span>
      </header>
      <button className='task__edit-button' type='button' onClick={onEditorOpenHandler}>
        <svg className='svg' width='42' height='42'>
          <use xlinkHref='img/sprite.svg#icon-more'></use>
        </svg>
      </button>
      <h3 className='task__title'>{task.title}</h3>
      <p className='task__description'>{task.description}</p>

      <button
        type='button'
        className={`task__expand-button ${!isExpand ? 'task__expand-button--active' : ''}`}
        onClick={onExpandClickHandler}
      >
        <svg className='svg' width='42' height='42'>
          <use xlinkHref='img/sprite.svg#icon-expand'></use>
        </svg>
        <span className='visually-hidden'> {isExpand ? 'Свернуть' : 'Развернуть'}</span>
      </button>
      <div
        ref={expanderRef}
        className={`task__expander ${!isExpand ? 'task__expander--active' : ''}`}
      >
        {task.subTasks.length > 0 ? (
          <div ref={contentRef} className='task__content'>
            <ul className='task__sub-list'>
              {task.subTasks.map((subtask, index) => (
                <li className='task__sub-item' key={subtask.id}>
                  <SubTask
                    subTaskId={subtask.id}
                    index={index}
                    text={subtask.text}
                    isDisabled={false}
                    checked={subtask.isDone}
                    taskData={task}
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ''
        )}

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
