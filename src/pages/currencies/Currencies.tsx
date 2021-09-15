import { useState, useContext } from 'react'
import { CurrencyContext } from '../../context'
import MessageNotLogged from '../../components/MessageNotLogged'
import { Link } from 'react-router-dom'
import Currency from '../../components/Currency'
import Loading from '../../components/Loading'
import MessageError from '../../components/MessageError'
import ButtonLogout from '../../components/ButtonLogout'

const Curriencies: React.FC = () => {
  const { currencies, status, loading, login } = useContext(CurrencyContext)
  const [amount, setAmount] = useState<number>(1)

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const number = Number(value) || null
    if (number && number >= 0) {
      setAmount(number)
    } else {
      setAmount(0)
    }
  }

  if (!login.isLogged) return <MessageNotLogged />
  if (loading) return <Loading />
  if (status.code !== 200) return <MessageError status={status} />
  
  const arrayCurrency = ['USD', 'BRL', 'EUR', 'CAD']

  return (
    <div className="background-page text-white">
      <div className="sub-div-currencies">
        <Link className="button-black-white text-center" to='/currency/update'>Atualizar valor monetário</Link>
        <div className="flex flex-col items-center">
          <p>Quantidade de BTC:</p>
          <input className="inputs text-black text-center" type="Text" onChange={handleAmount} value={amount} />
        </div>
        <div className="box-white">
          {
            arrayCurrency.map((name) => {
              return <Currency key={name} rate={currencies[name].rate_float} amount={amount} code={name} />
            })
          }
        </div>
        <ButtonLogout />
      </div>
    </div>
  )
}

export default Curriencies
