import { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import NotificationError from '../../components/NotificationError'
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
    <div className="flex font-mono h-screen items-center justify-center align-center bg-black">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center space-y-7 px-5 sm:px-10 md:px-20 py-14 mb-36 rounded-md">
          <div className="text-white text-5xl leading-normal w-4/5 flex justify-center border-b-2 py-2">
            <h1 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-300">
              Bitcoins
            </h1>
          </div>
          <p className="text-white text-1xl w-8/10 leading-tight font-mono">
            Faça login para verificar os valores dos bitcoins
          </p>
          <input id="ipt-email" className="w-full p-2 pl-5 rounded-md border-2 focus:outline-none" aria-label="Email" type='email' name='email' placeholder="Email" value={values.email.value} onChange={handleChange} />
          <input id="ipt-password" className="w-full p-2 pl-5 rounded-md border-2 focus:outline-none" aria-label="Senha" type='password' name='password' placeholder="Senha" value={values.password.value} onChange={handleChange} />
          <button className="bg-white text-black hover:opacity-70 focus:ring focus:ring-offset-1 focus:ring-indigo-300 focus:outline-none disabled:bg-gray-200 disabled:text-gray-500 px-4 py-2 rounded-md w-6/12"
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
