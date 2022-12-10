import { ISubTask } from '../../model/data-types'
import { useAppDispatch, useAppSelector } from '../../redux'
import SubTaskEditorItem from './sub-task-editor-item'

function SubTaskEditor(): JSX.Element {
  const subTasks = useAppSelector<ISubTask[]>((state) => state.subTaskReducer)
  const dispatch = useAppDispatch()

  return (
    <fieldset>
      <legend>Add subTask</legend>

      <ol>
        {subTasks.map((sT, i) => (
          <li key={`est-${i}`}>
            <SubTaskEditorItem subTask={sT} />
          </li>
        ))}
        <button
          type='button'
          onClick={() => {
            dispatch({
              type: 'SUBTASK_ADD',
              newSubTask: { id: 'st-' + Date.now().toString(), isDone: false, text: '' }
            })
          }}
        >
          +
        </button>
      </ol>
    </fieldset>
  )
}
export default SubTaskEditor
