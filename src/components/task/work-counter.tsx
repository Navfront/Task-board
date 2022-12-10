import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useEffect, useReducer } from 'react'

dayjs.extend(relativeTime)

interface IWorkCounterProps {
  inWorkStartTime: number
  inWorkAcc: number
  inDevColumn: boolean
}

function WorkCounter({ inWorkStartTime, inWorkAcc, inDevColumn }: IWorkCounterProps): JSX.Element {
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0)
  const startMsTime = new Date(inWorkStartTime).getTime()
  const fromTime = startMsTime + inWorkAcc

  useEffect(() => {
    let interval: NodeJS.Timer
    if (inDevColumn) {
      console.log('force update')

      interval = setInterval(() => {
        forceUpdate()
      }, 60000)
    }

    return () => {
      if (inDevColumn) {
        clearInterval(interval)
      }
    }
  }, [])

  return (
    <time className='task__time'>
      {`In work: ${fromTime === 0 ? 'not yet' : dayjs(new Date(fromTime).toISOString()).fromNow()}`}
    </time>
  )
}

export default WorkCounter
