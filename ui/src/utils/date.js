/**
 * Formats a date to a readable string.
 *
 * @param {Date | string | number} input - A Date object, ISO string, or timestamp.
 * @param {Object} options - Intl.DateTimeFormat options.
 * @param {string} locale - Locale string (default: 'en-US').
 * @returns {string} - Formatted date string.
 */
export function formatDate(input, options = {}, locale = 'en-US') {
  if (!input) return '';

  const date = new Date(input);
  if (isNaN(date)) return '';

  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  };

  return date.toLocaleDateString(locale, { ...defaultOptions, ...options });
}
