import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { StatusLogin } from '../Interfaces/interface'

export const useLogin =
  (token: string | null): { login: StatusLogin, setLogin: Dispatch<SetStateAction<StatusLogin>> } => {

    const [login, setLogin] = useState<StatusLogin>({ token: null, isLogged: false })

    useEffect(() => {
      setLogin({ token, isLogged: (!token) ? false : true })
    }, [token])

    return { login, setLogin }
  }
