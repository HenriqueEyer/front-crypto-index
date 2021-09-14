import { useContext, useEffect, useState } from 'react'
import { CurrencyContext } from '../../context'
import MessageNotLogged from '../../components/MessageNotLogged'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { fetchApiUpdate } from '../../service/fetchApi'
import ActualCurruency from '../../components/ActualCurrency'
import Loading from '../../components/Loading'
import MessageError from '../../components/MessageError'
import NotificationError from '../../components/NotificationError'
import SelectedCurrency from '../../components/SelectCurrency'
import { HandleChange, StatusRequest } from '../../Interfaces/interface'
import ButtonLogout from '../../components/ButtonLogout'
import NotificationSuccess from '../../components/NotificationSuccess'

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

const onHandleValue = (e: React.ChangeEvent<HTMLInputElement>, handleChange: HandleChange) => {
  const { value } = e.target
  e.target.value = Number(value) ? value : ''
  handleChange(e)
}

const UpdateCurriencies: React.FC = () => {
  const { currencies, error, loading, setNeedUpdate, login } = useContext(CurrencyContext)
  const [values, handleChange] = useForm(initialValues)
  const [response, setResponse] = useState<StatusRequest>({ data: '', loading: false, error: false })
  const [messageError, setMessageError] = useState<string>('')
  const [showMessage, setShowMessage] = useState<boolean>(false)

  const arrayCurrency = ['BRL', 'EUR', 'CAD']
  const { value, currency } = values

  const isFieldsValid = currency.valid && value.valid
  const formatBodyRequest = { currency: currency.value, value: value.value }

  useEffect(() => {
    if (response.data === 'Valor alterado com sucesso!') {
      setShowMessage(true)
      setNeedUpdate(true)
    } else {
      setMessageError(response.data)
    }
  }, [response.data, setNeedUpdate])

  if (!login.isLogged) return <MessageNotLogged />
  if (loading) return <Loading />
  if (error.isExist) return <MessageError error={error} />

  return (
    <div className="font-mono background-page">
      <div className="center-secondary-div px-5 py-14 mb-36 box-border sm:px-10 md:px-20">
        <Link className="button-black-white" to="/currency">Voltar</Link>
        <SelectedCurrency arrayCurrency={arrayCurrency} handleChange={handleChange} />
        <ActualCurruency currencies={currencies} selectValue={currency.value} />
        <div className="flex flex-col space-y-2">
          <label htmlFor="iptvalue" className="pl-3 text-white">
            Novo Valor
          </label>
          <input id="iptvalue" className="inputs" type='text' name='value' value={value.value} onChange={(e) => onHandleValue(e, handleChange)} />
        </div>
        <button className="button-white w-8/12"
          disabled={!isFieldsValid || response.loading} onClick={() => fetchApiUpdate(formatBodyRequest, setResponse, 'POST', 'http://localhost:3001/api/crypto/btc', login.token)}
        >
          {response.loading ? 'Carregando' : 'Atualizar'}
        </button>
        <ButtonLogout />
        {messageError
          ? <NotificationError message={messageError} resetMessage={() => setMessageError('')} />
          : null}
        {showMessage && !loading
          ? <NotificationSuccess hideMessage={() => setShowMessage(false)} />
          : null}
      </div>
    </div>
  )
}

export default UpdateCurriencies
