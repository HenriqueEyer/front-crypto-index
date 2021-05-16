import { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import NotificationError from '../../components/notification-error'
import { CurrencyContext } from '../../context'
import { useForm } from '../../hooks/useForm'
import { fetchApiLogin } from '../../service/fetchApi'


const initialValues = {
  email: {
    value: '',
    valid: false
  },
  password: {
    value: '',
    valid: false
  }
}

const Login = () => {
  const { setLogin } = useContext(CurrencyContext)
  const [values, handleChange] = useForm(initialValues)
  const [response, setResponse] = useState({ data: '', loading: false, error: false })
  const [goRedirect, setGoRedirect] = useState(false)
  const [messageError, setMessageError] = useState('')

  useEffect(() => {
    if (response.data !== '') {
      if (!response.error) {
        localStorage.setItem('token', response.data)
        setLogin({isLogged: true, token: response.data})
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
    <div className="flex h-screen items-center justify-center align-center bg-gray-200">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center space-y-7 px-5 sm:px-10 md:px-20 py-14 mb-36 bg-white rounded-md">
          <div className="text-gray-800 text-2xl w-full flex justify-center border-b-2 py-2 mb-4">
            <h1>
              Login
          </h1>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="ipt-email" className="pl-3">
              Email
            </label>
            <input id="ipt-email" className="p-2 pl-5 rounded-md border-2 focus:border-2 focus:bg-green-100" type='email' name='email' placeholder="Email" value={values.email.value} onChange={handleChange} />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="ipt-password" className="pl-3">
              Senha
            </label>
            <input id="ipt-password" className="p-2 pl-5 rounded-md border-2 focus:border-2 focus:bg-green-100" type='password' name='password' placeholder="Senha" value={values.password.value} onChange={handleChange} />
          </div>
          <button className="bg-green-600 text-white hover:opacity-75 focus:ring focus:ring-offset-1 focus:ring-indigo-300 focus:outline-none disabled:bg-gray-200 disabled:text-gray-500 px-4 py-2 rounded-md w-6/12"
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
