import { Link } from 'react-router-dom'

function Main(): JSX.Element {
  return (
    <div>
      main
      <p>
        <Link to='/board'>To board</Link>
      </p>
    </div>
  )
}

export default Main
