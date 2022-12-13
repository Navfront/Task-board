import { useState } from 'react'
import { ISubTask } from '../../model/data-types'
import { useAppDispatch } from '../../redux'
import sprite from '../../resources/sprite.svg'

interface SubTaskEditorItemProps {
  subTask: ISubTask
}

function SubTaskEditorItem({ subTask }: SubTaskEditorItemProps): JSX.Element {
  const dispatch = useAppDispatch()
  const [text, setText] = useState<string>(subTask.text)
  const [showEditButton, setShowEditButton] = useState<boolean>(false)

  return (
    <div className='subtask-editor-item'>
      <label className='subtask-editor-item__label'>
        <input
          width={text.length + 10}
          className='subtask-editor-item__input'
          type='text'
          value={text}
          placeholder={'Enter text..'}
          onChange={(event) => {
            setText(event.target.value)
            setShowEditButton(true)
          }}
        />

        <button
          className='subtask-editor-item__button subtask-editor-item__button--update'
          type='button'
          onClick={() => {
            dispatch({ type: 'SUBTASK_EDIT', subTask: { ...subTask, text } })
            setShowEditButton(false)
          }}
          style={{ opacity: showEditButton ? '1' : '0' }}
        >
          <svg className='subtask-editor-item__svg' width='35' height='35'>
            <use xlinkHref={sprite + '#icon-done'}></use>
          </svg>
          <span className='visually-hidden'>update subtask</span>
        </button>
        <button
          className='subtask-editor-item__button subtask-editor-item__button--delete'
          type='button'
          onClick={() => {
            dispatch({ type: 'SUBTASK_DELETE', subTaskToDelete: subTask })
          }}
        >
          <svg className='subtask-editor-item__svg' width='30' height='30'>
            <use xlinkHref={sprite + '#icon-block'}></use>
          </svg>
          <span className='visually-hidden'>delete subtask</span>
        </button>
      </label>
    </div>
  )
}

export default SubTaskEditorItem
