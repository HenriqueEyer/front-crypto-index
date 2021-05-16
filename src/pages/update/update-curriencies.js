import { useContext, useEffect, useState } from 'react'
import { CurrencyContext } from '../../context'
import MessageNotLogged from '../../components/message-not-logged'
import { Link, Redirect } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { fetchApiUpdate } from '../../service/fetchApi'
import ActualCurruency from '../../components/actual-currency'
import Loading from '../../components/loading'
import MessageError from '../../components/message-error'
import NotificationError from '../../components/notification-error'
import SelectedCurrency from '../../components/select-currency'

const initialValues = {
  currency: {
    value: 'BRL',
    valid: true
  },
  value: {
    value: 1,
    valid: true
  }
}

const onHandleValue = (e, handleChange) => {
  const { value } = e.target
  if (Number(value)) {
    e.target.value = Number(value)
    handleChange(e)
  } else {
    e.target.value = ''
    handleChange(e)
  }
}

const UpdateCurriencies = () => {
  const { currencies, error, loading, setNeedUpdate, needUpdate, login } = useContext(CurrencyContext)
  const [values, handleChange] = useForm(initialValues)
  const [response, setResponse] = useState({ data: '', loading: false, error: false })
  const [messageError, setMessageError] = useState('')

  const arrayCurrency = ['BRL', 'EUR', 'CAD']
  const { value, currency } = values
  const isFieldsValid = currency.valid && value.valid
  const formatBodyRequest = { currency: currency.value, value: value.value }
  useEffect(() => {
    if (response.data === 'Valor alterado com sucesso!') {
      setNeedUpdate(true)
    } else {
      setMessageError(response.data)
    }
  }, [response.data, setNeedUpdate])

  if (!login.isLogged) return <MessageNotLogged />
  if (loading) return <Loading />
  if (error.isExist) return <MessageError error={error} />
  if (needUpdate) return <Redirect to="/currency" />
  return (
    <div className="flex h-screen items-center justify-center align-center bg-gray-200">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center space-y-7 px-5 sm:px-10 md:px-20 py-14 mb-36 bg-white rounded-md">
          <Link className="flex flex-col mr-auto rounded-md py-2 px-4 bg-green-100 hover:bg-green-500 justify-self-start"  to="/currency">Voltar</Link>
          <SelectedCurrency arrayCurrency={arrayCurrency} handleChange={handleChange}/>
          <ActualCurruency currencies={currencies} selectValue={currency.value} />
          <div className="flex flex-col space-y-2">
            <label className="pl-3">
              Novo Valor
            </label>
            <input className="p-2 pl-5 rounded-md border-2 focus:border-2 focus:bg-green-100" type='text' name='value' value={value.value} onChange={(e) => onHandleValue(e, handleChange)} />
          </div>
          <button className="bg-green-600 text-white hover:opacity-75 focus:ring focus:ring-offset-1 focus:ring-indigo-300 focus:outline-none disabled:bg-gray-200 disabled:text-gray-500 px-4 py-2 rounded-md w-6/12"
            disabled={!isFieldsValid || response.loading} onClick={() => fetchApiUpdate(formatBodyRequest, setResponse, 'POST', 'http://localhost:3001/api/crypto/btc', login.token)}
          >
            {response.loading ? 'Carregando' : 'Atualizar'}
          </button>
          {messageError
            ? <NotificationError message={messageError} resetMessage={() => setMessageError('')} />
            : null}
        </div>
      </div>
    </div>
  )
}

export default UpdateCurriencies
