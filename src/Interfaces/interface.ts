export interface ValueInput {
  value: string | number
  valid: Boolean
}

export interface FormLogin {
  email: ValueInput
  password: ValueInput
}

export interface StatusLogin {
  token: null | string
  isLogged: Boolean
}

export interface StatusFetch {
  loading: boolean
  status: null | ReturnStatus
}

export interface ReturnStatus {
  code: null | number
  message: string
}

export interface CurrencyValues {
  code: string
  rate: string
  description: string
  rate_float: number
}

export interface Currencies {
  [key: string]: CurrencyValues
}

export interface StatusError {
  status: number
  message: string
}

export interface StatusRequest {
  data: string,
  loading: boolean,
  error: boolean
}

export type BodyRequest = any;

export type HandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void