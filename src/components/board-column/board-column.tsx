import Task from '../task/task'
import { columnTitles } from '../../model/data-types'
import { useAppSelector } from '../../redux'
import { IProjectsBoard } from './../../model/data-types'

export interface IColumnTitleProps {
  columnTitle: typeof columnTitles[number]
  classModificator: string
  projectId: string
}

function BoardColumn({ columnTitle, classModificator, projectId }: IColumnTitleProps): JSX.Element {
  const board = useAppSelector<IProjectsBoard>((state) => state.boardReducer)
  if (Object.keys(board).length !== 0) {
    return (
      <section className={`column column__${classModificator}`}>
        <h2 className='column__title'>{columnTitle}</h2>
        {board[projectId][columnTitle].length > 0 ? (
          <ul className='column__list'>
            {board[projectId][columnTitle].map((task) => (
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
                  projectId={projectId}
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
  return <></>
}

export default BoardColumn
