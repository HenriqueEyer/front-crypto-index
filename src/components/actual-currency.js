
const getActualCurrency = (currencies, selectValue) => {
  const { USD: { rate_float } } = currencies
  return (currencies[selectValue].rate_float / rate_float).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}

const ActualCurruency = ({ currencies, selectValue }) => (
  <div>
    {`Valor Atual: ${getActualCurrency(currencies, selectValue)}`}
  </div>
)

export default ActualCurruency
