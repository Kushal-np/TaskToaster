/**
 * Formats a date string or Date object into a localized date string (e.g., "12/25/2023").
 */
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString();
};

/**
 * Formats a date string or Date object into a localized time string (e.g., "11:00 AM").
 */
export const formatTime = (date: string | Date): string => {
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

/**
 * Formats a number into a currency string (e.g., "$1,234.56").
 * @param amount The number to format.
 * @param currency The currency code (e.g., 'USD', 'EUR').
 */
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
};