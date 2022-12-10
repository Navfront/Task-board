export interface ISubTaskProps {
  taskId: string
  index: number
  text: string
  canModify: boolean
}

function SubTask({ index, taskId, text, canModify = true }: ISubTaskProps): JSX.Element {
  const id = 'checkbox' + taskId + '-' + String(index)
  return (
    <div className='sub-task'>
      <input className='visually-hidden' type='checkbox' id={id} disabled={!canModify} />
      <label className='sub-task__label' htmlFor={id} tabIndex={0}>
        {text}
      </label>
    </div>
  )
}

export default SubTask
