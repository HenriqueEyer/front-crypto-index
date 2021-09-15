interface AppProps {
  arrayCurrency: Array<string>
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const SelectCurrency: React.FC<AppProps> = ({ arrayCurrency, handleChange })  => {
  return (
    <div className="flex flex-col text-black space-y-2">
      <label htmlFor='currency' className="pl-3">Moeda</label>
      <select
        className="p-2 pl-5 text-black bg-white rounded-md border-2 focus:border-2 focus:outline-none"
        name="currency"
        id="currency"
        onChange={handleChange}
      >
        {arrayCurrency.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default SelectCurrency
