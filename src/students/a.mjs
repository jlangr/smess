import dayjs from "dayjs";

// export const isEnabled = (enabledDate, disableDate) => {
//   const todaysDate = dayjs(new Date()).format("YYYY-MM-DD");
//   const enabledDateval = dayjs(enabledDate).format("YYYY-MM-DD");
//   const disabledDateval = disableDate
//     ? dayjs(disableDate).format("YYYY-MM-DD")
//     : disableDate;
//   if (
//     (disabledDateval &&
//       enabledDateval <= todaysDate &&
//       disabledDateval > todaysDate) ||
//     (!disabledDateval && enabledDateval <= todaysDate)
//   ) {
//     return true;
//   }
//   // (!disabledDateval && enabledDateval => todaysDate)
//   return false;
//   // drop through case
// };

//for isEnabled function, returns true if the current date is between enabledDate and disableDate. either theres no disableDate or its in the future

const isBeforeOrSame = (firstDate, secondDate) =>
  firstDate.isBefore(secondDate) || firstDate.isSame(secondDate);

export const isEnabled = (enabledDate, disabledDate) => {
  const startOfToday = dayjs().startOf('day');
  const startOfEnabledDate = dayjs(enabledDate).startOf('day');
  const startOfDisabledDate = dayjs(disabledDate).startOf('day');

  // return (startOfEnabledDate.isBefore(startOfToday) &&
  //   (!disabledDate || startOfDisabledDate.isAfter(startOfToday))) ||
  //   (startOfEnabledDate.isSame(startOfToday))
  return (startOfEnabledDate.isBefore(startOfToday) || startOfEnabledDate.isSame(startOfToday)) &&
      (!disabledDate || startOfDisabledDate.isAfter(startOfToday))
}
