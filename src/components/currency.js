const Currency = (props) => {
  const { code, rate, amount } = props
  const formatValue = (rate * amount).toLocaleString('pt-BR')
  return (
    <div className="">
      <p>{code}</p>
      <div className="bg-green-100 py-2 px-6">
        {formatValue}
      </div>
    </div>
  )
}

export default Currency
