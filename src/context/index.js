import React, { useState, createContext } from 'react';
import { useFetch } from '../hooks/useFetch';
import { useLogin } from '../hooks/useLogin';

const CurrencyContext = createContext();

const CurrencyProvider = ({ children }) => {
  const [currencies, setCurrencies] = useState();
  const [needUpdate, setNeedUpdate] = useState(false);
  const token = localStorage.getItem('token');
  const { login, setLogin } = useLogin(token);

  const { error, loading } = useFetch(
    'http://localhost:3001/api/crypto/btc',
    login.token,
    setCurrencies,
    !currencies || needUpdate,
    setNeedUpdate
  );


  console.log('currencies', currencies)
  const context = {
    currencies,
    setCurrencies,
    error,
    loading,
    setNeedUpdate,
    needUpdate,
    login,
    setLogin
  };


  return (
    <CurrencyContext.Provider value={context}>
      {children}
    </CurrencyContext.Provider>
  );
};

export { CurrencyContext, CurrencyProvider as Provider };