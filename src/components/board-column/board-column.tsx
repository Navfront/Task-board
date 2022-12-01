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
          <div className='task'>
            <h3 className='task__title'>Title</h3>
          </div>
        </li>
      </ul>
    </section>
  )
}

export default BoardColumn
