import { useState } from 'react'
import { ISubTask } from '../../model/data-types'
import { useAppDispatch } from '../../redux'

interface SubTaskEditorItemProps {
  subTask: ISubTask
}

function SubTaskEditorItem({ subTask }: SubTaskEditorItemProps): JSX.Element {
  const dispatch = useAppDispatch()
  const [text, setText] = useState<string>(subTask.text)
  return (
    <div className='subtask-editor-item'>
      <form
        className='subtask-editor-item__form'
        onSubmit={(event) => {
          event.preventDefault()
        }}
      >
        <label className='subtask-editor-item__label'>
          <span className='subtask-editor-item__text'>{subTask.text}</span>
          <input
            className='subtask-editor-item__input'
            type='text'
            value={text}
            onChange={(event) => {
              setText(event.target.value)
            }}
          />
        </label>
        <button
          type='button'
          onClick={() => {
            dispatch({ type: 'SUBTASK_EDIT', subTask: { ...subTask, text } })
          }}
        >
          OK
        </button>
        <button type='submit' className='visually-hidden'>
          Edit text submit
        </button>
      </form>
      <button
        className='subtask-editor-item__delete'
        type='button'
        onClick={() => {
          dispatch({ type: 'SUBTASK_DELETE', subTaskToDelete: subTask })
        }}
      >
        X
      </button>
    </div>
  )
}

export default SubTaskEditorItem
