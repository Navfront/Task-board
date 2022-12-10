import Task from '../task/task'
import { COLUMN_TITLES, ITask } from '../../model/data-types'
import { useAppSelector } from '../../redux'
import { IProjectsBoard } from './../../model/data-types'
import { useDrop } from 'react-dnd'
import { dNDItemTypes } from './../../dnd/item-types'
import { SearchState } from '../../redux/reducers/search-reducer/search-reducer'
import { filterTasksBySearchString } from '../../model/utils'

export interface IColumnTitleProps {
  columnTitle: typeof COLUMN_TITLES[number]
  classModificator: string
  projectId: string
}

function BoardColumn({ columnTitle, classModificator, projectId }: IColumnTitleProps): JSX.Element {
  const board = useAppSelector<IProjectsBoard>((state) => state.boardReducer)
  const search = useAppSelector<SearchState>((state) => state.searchReducer)

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: dNDItemTypes.TASK,
    drop(item, monitor) {
      if (monitor.canDrop()) return { columnTitle, projectId }
    },
    canDrop(item) {
      const i = item as ITask
      return columnTitle !== i.status
    },
    collect: (monitor) => {
      return {
        item: monitor.getItem(),
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop()
      }
    }
  }))

  if (Object.keys(board).length !== 0) {
    const filtredSortefTasks = filterTasksBySearchString(
      search.value,
      board[projectId][columnTitle].sort((a, b) => a.order - b.order)
    )
    return (
      <section
        className={`column column__${classModificator}`}
        style={{
          outlineOffset: '-5px',
          outline: isOver ? `5px solid ${canDrop ? '#48a77b87' : '#ff000070'}` : 'none'
        }}
        ref={(node) => drop(node)}
      >
        <h2 className='column__title'>{columnTitle}</h2>
        {filtredSortefTasks.length > 0 ? (
          <ul className='column__list'>
            {filtredSortefTasks.map((task) => (
              <li key={task.id} className='column__item'>
                <Task
                  id={task.id}
                  index={task.index}
                  order={task.order}
                  title={task.title !== '' ? task.title : 'No-name'}
                  description={task.description !== '' ? task.description : 'nothing..'}
                  createdDate={task.createdDate}
                  inWorkAcc={task.inWorkAcc}
                  inWorkStartTime={task.inWorkStartTime}
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
