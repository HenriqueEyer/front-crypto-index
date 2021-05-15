export const isValid = (name, value) => {
  return {
    email: verifyEmail(value),
    password: verifyPassword(value),
    currency: verifyCurrency(value),
    value: verifyValue(value)
  }[name];
}

const verifyEmail = (email) => {
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g;
  return emailRegex.test(email);
};

const verifyPassword = (password) => {
  const pwdRegex = /^[0-9]{6}$/;
  return (password.match(pwdRegex) && password.length >= 6);
};

const verifyCurrency = (currency) => {
  return ['CAD', 'BRL', 'EUR'].includes(currency);
};

const verifyValue = (value) => {
  return Number.isInteger(Number(value)) && value > 0;
};