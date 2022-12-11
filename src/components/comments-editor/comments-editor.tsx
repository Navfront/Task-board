import React, { useState } from 'react'
import ReactQuill from 'react-quill'

function CommentsEditor(): JSX.Element {
  const [value, setValue] = useState('')

  return <ReactQuill value={value} onChange={setValue} />
}

export default CommentsEditor
