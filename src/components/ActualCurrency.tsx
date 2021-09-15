import { Currencies } from "../Interfaces/interface"

interface AppProps {
  currencies: Currencies
  selectValue: string
}

const getActualCurrency = (currencies: Currencies, selectValue: string): string => {
  const { USD: { rate_float } } = currencies
  const value = (currencies[selectValue].rate_float / rate_float).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
  return value;
}

const ActualCurruency: React.FC<AppProps> = ({ currencies , selectValue }) => {
  return (
    <div className="text-black">
    {`Valor Atual: ${getActualCurrency(currencies, selectValue)}`}
    </div>
  )
}

export default ActualCurruency
