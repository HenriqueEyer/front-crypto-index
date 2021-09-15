import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import NotificationError from '../../components/NotificationError'
import { CurrencyContext } from '../../context/index'
import { useForm } from '../../hooks/useForm'
import { StatusRequest } from '../../Interfaces/interface'
import { fetchApiLogin } from '../../service/fetchApi'
import IMAGE_LOGIN from '../../assets/login.svg'
import IMAGE_COMPUTER from '../../assets/computer.svg'


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
    <div className="background lg:flex-row lg:items-start bg-white">
      <div className="top-login w-full lg:w-1/2 p-10 md:pl-40 mt-8 sm:mt-16">
        <h1 className="title bold pb-2 mb-4 text-indigo-500 border-b-2 max-w-xl">
          Login
        </h1>
        <div className="box-input mb-4">
          <label className="label-input" htmlFor="ipt-email">E-mail*</label>
          <input id="ipt-email" className="input" aria-label="Email" type='email' name='email' placeholder="email@site.com" value={values.email.value} onChange={handleChange} />
          {(!values.email.valid && values.email.value.length > 2) ? <h3 className="message-error-blue">E-mail inválido</h3> : null}
        </div>
        <div className="box-input mb-4">
          <label className="label-input" htmlFor="ipt-password">Senha*</label>
          <input id="ipt-password" className="input" aria-label="Senha" type='password' name='password' placeholder="6 character" value={values.password.value} onChange={handleChange} />
          {(!values.password.valid && values.password.value.length > 5) ? <h3 className="message-error-blue">Senha inválida</h3> : null}
        </div>
        <button className="button-purple"
          disabled={!isFieldsValid || response.loading} onClick={() => fetchApiLogin(formatBodyRequest, setResponse, 'POST', 'http://localhost:3001/api/login')}
        >
          {response.loading ? 'Carregando' : 'Entrar'}
        </button>
      </div>
      <div className="hidden lg:flex flex-col p-20 pt-28 h-full w-1/2 bg-indigo-500 items-start text-white">
        <h2 className="title bold mb-4">Principais tecnologias usadas: </h2>
        <ul className="flex flex-col space-y-2">
          <li>React + TypeScript - FrontEnd</li>
          <li>RTL - Test</li>
          <li>Node + TypeScript - Backend</li>
          <li>Tailwind - CSS</li>
          <li>Ilustrações do site <a href="https://undraw.co/illustrations">undraw.co</a></li>
        </ul>
        <img className="mt-20" src={IMAGE_COMPUTER} alt="Ilustração de uma pessoa com um notebook"/>
      </div>
      <img alt="Imagem para simbolizar o login do usuário" src={IMAGE_LOGIN} className="w-8/12 sm:w-5/12 md:w-3/12 md:left-32 max-w-3xl absolute bottom-10 left-12" />
      {messageError
        ? <NotificationError message={messageError} resetMessage={() => setMessageError('')} />
        : null}
    </div>
  )
}

export default Login
