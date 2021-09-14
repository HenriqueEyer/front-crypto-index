import { useContext, useEffect, useState } from 'react'
import { CurrencyContext } from '../../context'
import MessageNotLogged from '../../components/MessageNotLogged'
import { Link, Redirect } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { fetchApiUpdate } from '../../service/fetchApi'
import ActualCurruency from '../../components/ActualCurrency'
import Loading from '../../components/Loading'
import MessageError from '../../components/MessageError'
import NotificationError from '../../components/NotificationError'
import SelectedCurrency from '../../components/SelectCurrency'

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
    <div className="flex font-mono h-screen items-center justify-center bg-black">
      <div className="flex flex-col items-center space-y-7 px-5 sm:px-10 md:px-20 py-14 mb-36 border rounded-md">
        <Link className="flex flex-col text-white mr-auto rounded-md py-2 px-4 border hover:bg-white hover:text-black justify-self-start" to="/currency">Voltar</Link>
        <SelectedCurrency arrayCurrency={arrayCurrency} handleChange={handleChange} />
        <ActualCurruency currencies={currencies} selectValue={currency.value} />
        <div className="flex flex-col space-y-2">
          <label htmlFor="iptvalue" className="pl-3 text-white">
            Novo Valor
          </label>
          <input id="iptvalue" className="w-full p-2 pl-5 rounded-md border-2 focus:outline-none" type='text' name='value' value={value.value} onChange={(e) => onHandleValue(e, handleChange)} />
        </div>
        <button className="bg-white text-black hover:opacity-70 focus:ring focus:ring-offset-1 focus:ring-indigo-300 focus:outline-none disabled:bg-gray-200 disabled:text-gray-500 px-4 py-2 rounded-md w-6/12"
          disabled={!isFieldsValid || response.loading} onClick={() => fetchApiUpdate(formatBodyRequest, setResponse, 'POST', 'http://localhost:3001/api/crypto/btc', login.token)}
        >
          {response.loading ? 'Carregando' : 'Atualizar'}
        </button>
        {messageError
          ? <NotificationError message={messageError} resetMessage={() => setMessageError('')} />
          : null}
      </div>
    </div>
  )
}

export default UpdateCurriencies
