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
import IMAGE_COIN from '../../assets/coin.svg'

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
  const { currencies, status, loading, setNeedUpdate, login } = useContext(CurrencyContext)
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

  const updateCurrency = (): void => fetchApiUpdate(formatBodyRequest, setResponse, 'POST', 'http://localhost:3001/api/crypto/btc', login.token)

  if (!login.isLogged) return <MessageNotLogged />
  if (loading) return <Loading />
  if (status.code !== 200) return <MessageError status={status} />

  return (
    <div className="background bg-indigo-500 items-center">
      <div className="h-1/2">
        <div className="flex flex-col w-full h-full justify-center items-center p-6">
          <Link className="button-white" to="/currency">Voltar</Link>
          <img alt="Símbolo do Bitcoin" src={IMAGE_COIN} className="w-3/5 mt-12 max-w-md" />
        </div>
      </div>
      <div className="flex flex-col w-full h-1/2 pt-4 px-5 rounded-t-3xl bg-white max-w-lg text-center">
        <label htmlFor="iptvalue" className="pl-3 text-black">
          Novo Valor
        </label>
        <input id="iptvalue" className="input" type='text' name='value' value={value.value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onHandleValue(e, handleChange)} />
        <SelectedCurrency arrayCurrency={arrayCurrency} handleChange={handleChange} />
        <ActualCurruency currencies={currencies} selectValue={currency.value} />
        <button className="button-purple"
          disabled={!isFieldsValid || response.loading} onClick={updateCurrency}
        >
          {response.loading ? 'Carregando' : 'Atualizar'}
        </button>
        <ButtonLogout />
        {messageError
          ? <NotificationError message={messageError} resetMessage={(): void => setMessageError('')} />
          : null}
        {showMessage && !loading
          ? <NotificationSuccess hideMessage={(): void => setShowMessage(false)} />
          : null}
      </div>
    </div>
  )
}

export default UpdateCurriencies
