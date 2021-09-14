export const isValid = (name: string, value: any): boolean => {
  const isValidate = {
    email: verifyEmail(value),
    password: verifyPassword(value),
    currency: verifyCurrency(value),
    value: verifyValue(value)
  }[name]
  return !isValidate? false : isValidate
}

const verifyEmail = (email: string): boolean => {
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g
  return emailRegex.test(email)
}

const verifyPassword = (password: string): boolean => {
  const pwdRegex = /^[0-9]{6}$/
  const isValidate = (password.match(pwdRegex) && password.length >= 6)
  return !isValidate ? false : isValidate; 
}

const verifyCurrency = (currency: string): boolean => {
  return ['CAD', 'BRL', 'EUR'].includes(currency)
}

const verifyValue = (value: string): boolean => {
  return Number.isInteger(Number(value)) && Number(value) > 0
}