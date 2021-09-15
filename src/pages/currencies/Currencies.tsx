import { useState, useContext } from 'react'
import { CurrencyContext } from '../../context'
import MessageNotLogged from '../../components/MessageNotLogged'
import { Link } from 'react-router-dom'
import Currency from '../../components/Currency'
import Loading from '../../components/Loading'
import MessageError from '../../components/MessageError'
import ButtonLogout from '../../components/ButtonLogout'
import IMAGE_TRANSFER from '../../assets/transfer.svg'


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
    <div className="background bg-indigo-500 items-center">
      <div className="h-1/2">
        <div className="flex flex-col w-full h-full justify-center items-center p-6">
          <p className="text-white text-lg mt-2 mb-2">Quantidade de BTC:</p>
          <input className="input text-black text-center" type="Text" onChange={handleAmount} value={amount} />
          <img alt="Duas pessoas trocando dinheiro" className="w-4/5 mt-12 max-w-md" src={IMAGE_TRANSFER} />
        </div>
      </div>
      <div className="flex flex-col w-full h-1/2 pt-4 px-5 rounded-t-3xl bg-white max-w-lg">
        <h2>Valores Moedas:</h2>
        <div className="flex flex-col w-full h-full">
          {
            arrayCurrency.map((name) => {
              return <Currency key={name} rate={currencies[name].rate_float} amount={amount} code={name} />
            })
          }
          <div className="flex w-full justify-center items-center space-x-4">
            <Link className="button-purple" to='/currency/update'>Atualizar valor monetário</Link>
            <ButtonLogout/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Curriencies
