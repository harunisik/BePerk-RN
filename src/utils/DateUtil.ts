const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const YEAR = DAY * 365;

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export function dateDiff(time: number) {
  const start = new Date(time);
  const end = new Date();
  const diff = end.getTime() - start.getTime();

  const seconds = Math.floor(diff / SECOND);
  if (seconds <= 0) {
    return seconds + 's';
  }

  const minutes = Math.floor(diff / MINUTE);
  if (minutes === 0) {
    return seconds + 's';
  }

  const hours = Math.floor(diff / HOUR);
  if (hours === 0) {
    return minutes + 'm';
  }

  const days = Math.floor(diff / DAY);
  if (days === 0) {
    return hours + 'h';
  }

  const weeks = Math.floor(diff / WEEK);
  if (weeks === 0) {
    return days + 'd';
  }

  const years = Math.floor(diff / YEAR);
  if (years === 0) {
    return weeks + 'w';
  }

  return years + 'y';
}

export function formatDate(time: number) {
  const date = new Date(time);
  return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()} at ${date.getHours()}:${('00' + date.getMinutes()).slice(-2)}`;
}
