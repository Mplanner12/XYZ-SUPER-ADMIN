export function formatDateMonthAndYear(date: string | Date | null | undefined): string {
  if (!date) return "Invalid Date";

  const dateObj = typeof date === "string" ? new Date(Date.parse(date)) : new Date(date);

  if (isNaN(dateObj.getTime())) return "Invalid Date";

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  return `${day}-${month}-${year}`;
}



export const formatCurrency = (value: string | number | null | undefined) => {
  if (value == null) return ""; 
  const rawValue = value
    .toString()
    .replace(/\D/g, ''); 
  return rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};