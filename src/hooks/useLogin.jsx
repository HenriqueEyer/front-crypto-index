import { useEffect, useState } from 'react'

export const useLogin = (token) => {
  const [login, setLogin] = useState({ token: null, isLogged: false })

  useEffect(() => {
    if (!token) {
      setLogin({ token: null, isLogged: false })
    } else {
      setLogin({ token: token, isLogged: true })
    }
  }, [token])

  return { login, setLogin }
}
