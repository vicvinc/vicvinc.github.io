import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

export { dayjs }

/** 相对时间，如 "3 天前" */
export const fromNow = (d: string | Date): string => dayjs(d).fromNow()

/** YYYY-MM-DD */
export const formatDate = (d: string | Date): string => {
  const dt = dayjs(d)
  return dt.isValid() ? dt.format('YYYY-MM-DD') : String(d)
}
