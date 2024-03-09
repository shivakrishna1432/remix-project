import { format } from "date-fns";

export function formatedDate(date) {
  return format(date, "MMMM do, yyyy, hh:mm a");
}

// const date = new Date(2020, 2, 9, 11, 30); // March is represented by 2 (0-based index)
// const formattedDate = formatDate(date);
// console.log(formattedDate); // Output: March 9th, 2020, 11:30 AM
