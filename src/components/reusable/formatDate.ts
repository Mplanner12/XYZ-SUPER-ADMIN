export function formatDate(dateStr: string): string {
  // Create a Date object from the input string
  const date = new Date(dateStr);
  if (!dateStr) {
    return "Loading...";
  }
  // Check for invalid date
  if (isNaN(date.getTime())) {
      throw new Error("Invalid date format. Expected YYYY-MM-DD.");
  }

  // Define an array of month names
  const months: string[] = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
  ];

  // Extract the month, day, and year from the date
  const month: string = months[date.getMonth()]; // getMonth() returns 0-based month index
  const day: number = date.getDate(); // getDate() returns the day of the month
  const year: number = date.getFullYear(); // getFullYear() returns the year

  // Return the formatted string
  return `${month} ${day}, ${year}`;
}