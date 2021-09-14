interface AppProps {
  code: string
  rate: number
  amount: number
}

const Currency: React.FC<AppProps> = ({ code, rate, amount }) => {
  const formatValue = (rate * amount).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
  return (
    <div className="flex justify-center text-black align-center">
      <div className="flex col justify-between py-2 px-1 border-b-2 w-4/5">
        <span className="w-1/5">{code}</span>
        <h3 className="w-4/5 truncate">{formatValue}</h3>
      </div>
    </div>
  )
}

export default Currency
