import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { IExComment } from '../../model/data-types'
import { useAppDispatch } from '../../redux'
import { IEditorState } from '../comments/comments'

interface ICommentProps {
  className: string
  data: IExComment
  editorState: IEditorState
  setEditorState: Dispatch<SetStateAction<IEditorState>>
}

function Comment({ className, data, editorState, setEditorState }: ICommentProps): JSX.Element {
  const { likes, text, children } = data
  const dispatch = useAppDispatch()
  const content = React.createRef<HTMLDivElement>()

  useEffect(() => {
    if (typeof text === 'string') {
      const current = content.current
      if (current != null) {
        current.innerHTML = text
      }
    }
  }, [])

  return (
    <>
      <article className={`${className} comment`}>
        <header className='comment__header'>
          <button
            type='button'
            className='comment__button comment__button--like'
            onClick={() => {
              dispatch({
                type: 'COMMENT_UPDATE',
                projectId: data.projectId,
                taskId: data.taskId,
                comment: {
                  ...data,
                  likes: data.likes + 1,
                  children: data.children.map((c) => c.id)
                }
              })
            }}
          >
            <svg className='svg' width='30' height='30'>
              <use xlinkHref='img/sprite.svg#icon-heart-plus'></use>
            </svg>
            <span className='visually-hidden'>like</span>
          </button>
          <span className='comment__like-counter'>{likes}</span>

          <button
            onClick={() => {
              dispatch({
                type: 'COMMENT_UPDATE',
                projectId: data.projectId,
                taskId: data.taskId,
                comment: {
                  ...data,
                  likes: data.likes - 1,
                  children: data.children.map((c) => c.id)
                }
              })
            }}
            type='button'
            className='comment__button comment__button--dis'
          >
            <svg className='svg' width='30' height='30'>
              <use xlinkHref='img/sprite.svg#icon-heart-minus'></use>
            </svg>
            <span className='visually-hidden'>dislike</span>
          </button>
          <button
            onClick={() => {
              dispatch({
                type: 'COMMENT_DELETE',
                projectId: data.projectId,
                taskId: data.taskId,
                comment: {
                  ...data,
                  children: data.children.map((c) => c.id)
                }
              })
            }}
            type='button'
            className='comment__button comment__button--delete'
          >
            <svg className='svg' width='30' height='30'>
              <use xlinkHref='img/sprite.svg#icon-block'></use>
            </svg>
            <span className='visually-hidden'>delete</span>
          </button>
        </header>
        <div className='comment__content' ref={content}>
          {text}
        </div>

        <footer className='comment__footer'>
          <button
            onClick={() => {
              setEditorState({
                isShow: true,
                currentComment: {
                  parent: data.id,
                  id: Date.now().toString(),
                  projectId: data.projectId,
                  taskId: data.taskId,
                  children: [],
                  likes: 0,
                  text: '',
                  userId: null
                }
              })
            }}
            type='button'
            className='comment__button comment__button--answer'
          >
            Answer
          </button>
        </footer>
      </article>
      {children.length > 0 && (
        <ul className='comment__sub-comment-list'>
          {children.map((child) => (
            <li className='comment__sub-comment-item' key={child.id}>
              <Comment
                className={className}
                data={child}
                editorState={editorState}
                setEditorState={setEditorState}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default Comment
