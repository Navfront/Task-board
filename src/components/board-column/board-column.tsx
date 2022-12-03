import React from 'react'
import { columnTitles, IBoard } from '../../model/data-types'
import { useAppSelector } from '../../redux'

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
            <li key={task.id} className='column__item'>
              <Task
                id={task.id}
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
