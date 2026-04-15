export function getMonthYear(dateStr: string) {
  const date = new Date(dateStr + 'T00:00:00');
  const year = date.getUTCFullYear();
  const monthIndex = date.getUTCMonth();

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  return `${monthNames[monthIndex]} ${year}`;
}