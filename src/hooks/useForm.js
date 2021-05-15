import { useState } from 'react'
import { isValid } from '../service/validators'

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues)

  return [
    values,
    e => {
    setValues({
      ...values,
      [e.target.name]: {
        value: e.target.value,
        valid: isValid(e.target.name, e.target.value)
      }
    })
  }]
}
