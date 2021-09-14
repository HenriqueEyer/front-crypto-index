import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import NotificationError from '../../components/NotificationError'
import { CurrencyContext } from '../../context/index'
import { useForm } from '../../hooks/useForm'
import { StatusRequest } from '../../Interfaces/interface'
import { fetchApiLogin } from '../../service/fetchApi'

const initialValues: any = {
  email: {
    value: '',
    valid: false
  },
  password: {
    value: '',
    valid: false
  }
}

const Login: React.FC = () => {
  const { setLogin } = useContext(CurrencyContext)
  const [values, handleChange] = useForm(initialValues)
  const [response, setResponse] = useState<StatusRequest>({ data: '', loading: false, error: false })
  const [goRedirect, setGoRedirect] = useState<boolean>(false)
  const [messageError, setMessageError] = useState<string>('')

  useEffect(() => {
    if (response.data !== '') {
      if (!response.error) {
        localStorage.setItem('token', response.data)
        setLogin({ isLogged: true, token: response.data })
        setGoRedirect(true)
      } else {
        setMessageError(response.data)
        setResponse({ data: '', loading: false, error: false })
      }
    }
  }, [response.data, response.error, setLogin])

  const isFieldsValid = values.password.valid && values.email.valid
  const formatBodyRequest = { email: values.email.value, password: values.password.value }

  if (goRedirect) return <Redirect to='/currency' />

  return (
    <div className="background-page">
      <div className="w-full max-w-screen-lg">
        <div className="center-secondary-div space-login-page">
          <div className="text-title position-title">
            <h1 className="gradient-color-blue-white">
              Bitcoins
            </h1>
          </div>
          <p className="sub-title m-4">
            Faça login para verificar os valores dos bitcoins
          </p>
          <div className="w-full max-w-sm">
            {(!values.email.valid && values.email.value.length > 2) ? <h3 className="message-error-input">Email inválido - (email@email.com)</h3> : null}
            <input id="ipt-email" className="inputs" aria-label="Email" type='email' name='email' placeholder="Email" value={values.email.value} onChange={handleChange} />
          </div>
          <div className="w-full max-w-sm">
            {(!values.password.valid && values.password.value.length > 5) ? <h3 className="message-error-input">Password inválido</h3> : null}
            <input id="ipt-password" className="inputs" aria-label="Senha" type='password' name='password' placeholder="Senha" value={values.password.value} onChange={handleChange} />
          </div>
          <button className="button-white max-w-lg"
            disabled={!isFieldsValid || response.loading} onClick={() => fetchApiLogin(formatBodyRequest, setResponse, 'POST', 'http://localhost:3001/api/login')}
          >
            {response.loading ? 'Carregando' : 'Entrar'}
          </button>
          {messageError
            ? <NotificationError message={messageError} resetMessage={() => setMessageError('')} />
            : null}
        </div>
      </div>
    </div>
  )
}

export default Login
