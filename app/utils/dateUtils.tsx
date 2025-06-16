export const getNextDate = (selectedDateString: Date) => {
  const selectedDate = new Date(selectedDateString);
  const nextDate = new Date(selectedDate);
  nextDate.setDate(nextDate.getDate() + 1);
  return nextDate;
}
