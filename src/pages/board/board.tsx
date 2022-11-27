import { Link } from 'react-router-dom'

function Board(): JSX.Element {
  return (
    <div>
      board
      <p>
        <Link to={'/'}>To Main</Link>
      </p>
    </div>
  )
}

export default Board
