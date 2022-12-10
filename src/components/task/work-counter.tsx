import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useEffect, useState } from 'react'

dayjs.extend(relativeTime)

interface IWorkCounterProps {
  inWorkStartTime: number
  inWorkAcc: number
  inDevColumn: boolean
}

function WorkCounter({ inWorkStartTime, inWorkAcc, inDevColumn }: IWorkCounterProps): JSX.Element {
  const [dateNow, setDateNow] = useState<number>(Date.now())
  const startMsTime = new Date(inWorkStartTime).getTime()
  const fromTime = dateNow - startMsTime - inWorkAcc
  useEffect(() => {
    let interval: NodeJS.Timer
    if (inDevColumn) {
      interval = setInterval(() => {
        setDateNow(Date.now())
      }, 1000)
    }

    return () => {
      if (inDevColumn) {
        clearInterval(interval)
      }
    }
  }, [])

  return (
    <time className='task__time'>
      {`In work: ${fromTime > 0 ? 'not yet' : dayjs(new Date(fromTime).toISOString()).toNow()}`}
    </time>
  )
}

export default WorkCounter
