import { useState, useContext } from 'react'
import { CurrencyContext } from '../../context'
import MessageNotLogged from '../../components/MessageNotLogged'
import { Link } from 'react-router-dom'
import Currency from '../../components/Currency'
import Loading from '../../components/Loading'
import MessageError from '../../components/MessageError'

const Curriencies = () => {
  const { currencies, error, loading, login } = useContext(CurrencyContext)
  const [amount, setAmount] = useState(1)

  const handleAmount = (e) => {
    const { value } = e.target
    if (Number(value) && Number(value) >= 0) {
      setAmount(Number(value))
    } else {
      setAmount(0)
    }
  }

  if (!login.isLogged) return <MessageNotLogged />
  if (loading) return <Loading />
  if (error.isExist) return <MessageError error={error} />
  const arrayCurrency = ['USD', 'BRL', 'EUR', 'CAD']
  return (
    <div className="flex h-screen items-center justify-center align-center bg-black text-white">
      <div className="flex w-full flex-col items-center space-y-7 px-5 sm:px-10 md:px-20 py-14 mb-36 rounded-md">
        <Link className="rounded-md py-2 px-8 border hover:bg-white hover:text-black" to='/currency/update'>Atualizar valor monetário</Link>
        <div className="flex flex-col items-center">
          <p>Quantidade de BTC:</p>
          <input className="p-2 text-center rounded-md border-2 text-black w-3/5" type="Text" onChange={handleAmount} value={amount} />
        </div>
        <div className="rounded-md text-center flex-wrap bg-white w-full sm:w-3/5">
          {
            arrayCurrency.map((name) => {
              return <Currency key={name} rate={currencies[name].rate_float} amount={amount} code={name} />
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Curriencies
