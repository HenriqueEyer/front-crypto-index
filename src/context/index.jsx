import { useState, createContext } from 'react'
import { useFetch } from '../hooks/useFetch'
import { useLogin } from '../hooks/useLogin'

const CurrencyContext = createContext()

const CurrencyProvider = ({ children }) => {
  const [currencies, setCurrencies] = useState()
  const [needUpdate, setNeedUpdate] = useState(false)

  const token = localStorage.getItem('token')

  const { login, setLogin } = useLogin(token)

  const logout = () => {
    localStorage.removeItem('token');
    setLogin({ token: null, isLogged: false});
  }

  const { status, loading } = useFetch(
    'http://localhost:3001/api/crypto/btc',
    login.token,
    setCurrencies,
    !currencies || needUpdate,
    setNeedUpdate
  )

  const context = {
    currencies,
    setCurrencies,
    status,
    loading,
    setNeedUpdate,
    needUpdate,
    login,
    setLogin,
    logout
  }


  return (
    <CurrencyContext.Provider value={context}>
      {children}
    </CurrencyContext.Provider>
  )
}

export { CurrencyContext, CurrencyProvider as Provider }
