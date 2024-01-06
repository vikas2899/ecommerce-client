const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: 'INR',
  style: 'currency',
});

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const textShortner = (text, limit) => {
  return text.length > limit ? text.slice(0, limit) + '...' : text;
};

export const getDiscountPercentage = (price, discount_price) => {
  let originalPrice = price + discount_price;
  let discountPercentage = Math.round(
    +((originalPrice - price) / originalPrice) * 100
  );
  return discountPercentage;
};

export const formatCurrency = (number) => {
  return CURRENCY_FORMATTER.format(number);
};

export const formatAddress = (data) => {
  return `${data.addressLine1}, ${data.city}, ${data.district}, ${data.state} - ${data.pincode}`;
};

export const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const INC_FACTOR = 10;
