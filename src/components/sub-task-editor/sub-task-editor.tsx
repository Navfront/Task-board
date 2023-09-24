import { ISubTask } from '../../model/data-types'
import { useAppDispatch, useAppSelector } from '../../redux'
import SubTaskEditorItem from './sub-task-editor-item'
import sprite from '../../resources/sprite.svg'

function SubTaskEditor(): JSX.Element {
  const subTasks = useAppSelector<ISubTask[]>((state) => state.subTaskReducer)
  const dispatch = useAppDispatch()

  return (
    <section className='sub-task-editor'>
      <h3 className='sub-task-editor__title'>Add Sub-Tasks</h3>

      <ol className='sub-task-editor__list'>
        {subTasks.map((sT, i) => (
          <li className='sub-task-editor__item' key={`est-${i}`}>
            <SubTaskEditorItem subTask={sT} />
          </li>
        ))}
        <button
          className='sub-task-editor__add-btn'
          type='button'
          onClick={() => {
            dispatch({
              type: 'SUBTASK_ADD',
              newSubTask: { id: 'st-' + Date.now().toString(), isDone: false, text: '' }
            })
          }}
        >
          <svg className='svg' width='42' height='42'>
            <use xlinkHref={sprite + '#icon-add'}></use>
          </svg>
          <span className='visually-hidden'>add new subtask</span>
        </button>
      </ol>
    </section>
  )
}
export default SubTaskEditor
