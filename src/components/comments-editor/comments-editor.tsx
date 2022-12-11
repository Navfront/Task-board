import { Dispatch, SetStateAction, useState } from 'react'
import ReactQuill from 'react-quill'
import { IComment } from '../../model/data-types'
import { useAppDispatch } from '../../redux'
import { IEditorState } from '../comments/comments'

interface ICommentsEditorProps {
  state: IEditorState
  setState: Dispatch<SetStateAction<IEditorState>>
  projectId: string
  taskId: string
}

function CommentsEditor({ state, setState, projectId, taskId }: ICommentsEditorProps): JSX.Element {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState('')
  console.log(value)
  console.log(state.currentComment)

  const emptyComment: IComment = {
    id: Date.now().toString(),
    userId: null,
    projectId,
    taskId,
    text: '',
    likes: 0,
    children: [],
    parent: null
  }

  return state.isShow ? (
    <div className='comments-editor'>
      <ReactQuill value={value} onChange={setValue} />
      <div className='comments-editor__controls'>
        <button
          disabled={value.length < 2}
          type='button'
          className='comments-editor__button comments-editor__button--save'
          onClick={() => {
            const parent = state.currentComment?.parent
            dispatch({
              type: 'COMMENT_ADD',
              projectId: emptyComment.projectId,
              taskId: emptyComment.taskId,
              comment: {
                ...emptyComment,
                text: value,
                parent: parent != null ? parent : null
              }
            })
            setValue('')
            setState({ ...state, isShow: false })
          }}
        >
          <span>Save</span>
        </button>
        <button
          type='button'
          className='comments-editor__button comments-editor__button--cancel'
          onClick={() => {
            setValue('')
            setState({ ...state, isShow: false })
          }}
        >
          <span>Cancel</span>
        </button>
      </div>
    </div>
  ) : (
    <></>
  )
}

export default CommentsEditor
