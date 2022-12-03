import React from 'react'
import { useAppSelector } from '../../redux'
import { columnTitles, IBoard } from '../../redux/reducers/board-reducer/board-reducer'
import Task from '../task/task'

export interface IColumnTitleProps {
  columnTitle: typeof columnTitles[number]
  classModificator: string
}

function BoardColumn({ columnTitle, classModificator }: IColumnTitleProps): JSX.Element {
  const board = useAppSelector<IBoard>(
    (state) => state.boardReducer,
    (prev, curr) => {
      return prev[columnTitle].length !== curr[columnTitle].length
    }
  )
  console.log(board)

  return (
    <section className={`column column__${classModificator}`}>
      <h2 className='column__title'>{columnTitle}</h2>
      {board[columnTitle].length > 0 ? (
        <ul className='column__list'>
          {board[columnTitle].map((task) => (
            <li key={task.taskId} className='column__item'>
              <Task
                taskId={task.taskId}
                order={task.order}
                title={task.title !== '' ? task.title : 'No-name'}
                description={task.description !== '' ? task.description : 'nothing..'}
                createdDate={task.createdDate}
                inWork={task.inWork}
                doneDate={task.doneDate}
                priority={task.priority}
                files={task.files}
                status={task.status}
                subTasks={task.subTasks}
                comments={task.comments}
              />
            </li>
          ))}
        </ul>
      ) : (
        ''
      )}
    </section>
  )
}

export default React.memo(BoardColumn)
