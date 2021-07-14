/** @see http://www.gov.cn/zhengce/content/2020-11/25/content_5564127.htm */
/** @see https://github.com/keqingrong/public-holidays-cn/blob/master/src/2021.ts */

const holidaysOfLaw = ['01-01', '05-01', '10-01', '10-02', '10-03']

/**
 * 2021年元旦、春节、清明节、劳动节、端午节、中秋节和国庆节放假调休日期
 */
const holidaysOf2021 = [
  '2021-01-01', // 元旦（3天）
  '2021-01-02',
  '2021-01-03',
  '2021-02-11', // 春节（7天）
  '2021-02-12',
  '2021-02-13',
  '2021-02-14',
  '2021-02-15',
  '2021-02-16',
  '2021-02-17',
  '2021-04-03', // 清明节（3天）
  '2021-04-04',
  '2021-04-05',
  '2021-05-01', // 劳动节（5天）
  '2021-05-02',
  '2021-05-03',
  '2021-05-04',
  '2021-05-05',
  '2021-06-12', // 端午节（3天）
  '2021-06-13',
  '2021-06-14',
  '2021-09-19', // 中秋节（3天）
  '2021-09-20',
  '2021-09-21',
  '2021-10-01', // 国庆节（7天）
  '2021-10-02',
  '2021-10-03',
  '2021-10-04',
  '2021-10-05',
  '2021-10-06',
  '2021-10-07',
]

/**
 * 2021年，休息日上班日期
 */
const workdaysOf2021 = [
  '2021-02-07', // 星期日
  '2021-02-20', // 星期六
  '2021-04-25', // 星期日
  '2021-05-08', // 星期六
  '2021-09-18', // 星期六
  '2021-09-26', // 星期日
  '2021-10-09', // 星期六
]

export { holidaysOf2021, holidaysOfLaw, workdaysOf2021 }