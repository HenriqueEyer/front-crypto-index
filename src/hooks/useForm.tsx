import { useState } from 'react'
import { HandleChange } from '../Interfaces/interface'
import { isValid } from '../service/validators'

export const useForm =
  (initialValues: any): [any, HandleChange] => {

    const [values, setValues] = useState<any>(initialValues)

    const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
      setValues({
        ...values,
        [e.target.name]: {
          value: e.target.value,
          valid: isValid(e.target.name, e.target.value)
        }
      })
    }

    return [
      values,
      handle
    ]
  }
