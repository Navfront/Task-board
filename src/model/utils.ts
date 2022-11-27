import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export const HumanizeLastDate = (date: Date | null): string => {
  if (date != null) {
    return `Last visit: ${dayjs(date).toNow(true)} ago`
  }
  return ''
}
