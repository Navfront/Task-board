import Task from '../task/task'

export const columnTitles = ['Queue', 'Development', 'Done'] as const

interface IColumnTitleProps {
  columnTitle: typeof columnTitles[number]
  classModificator: string
}

function BoardColumn({ columnTitle, classModificator }: IColumnTitleProps): JSX.Element {
  return (
    <section className={`column column__${classModificator}`}>
      <h2 className='column__title'>{columnTitle}</h2>
      <ul className='column__list'>
        <li className='column__item'>
          <Task
            taskId={'111'}
            order={0}
            title={'The Biggest Task'}
            description={'nothing..'}
            createdDate={new Date()}
            inWork={1246}
            doneDate={null}
            priority={'low'}
            files={[]}
            status={columnTitle}
            subTasks={[]}
          />
          <Task
            taskId={'222'}
            order={0}
            title={'The Easyest Task'}
            description={'nothing..'}
            createdDate={new Date()}
            inWork={1246}
            doneDate={null}
            priority={'low'}
            files={[]}
            status={columnTitle}
            subTasks={[]}
          />
          <Task
            taskId={'333'}
            order={0}
            title={'The Hardest Task'}
            description={'nothing..'}
            createdDate={new Date()}
            inWork={1246}
            doneDate={null}
            priority={'low'}
            files={[]}
            status={columnTitle}
            subTasks={[]}
          />
        </li>
      </ul>
    </section>
  )
}

export default BoardColumn
