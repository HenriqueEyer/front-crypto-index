const SelectCurrency = ({arrayCurrency, handleChange}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="pl-3">Moeda</label>
      <select
        className="p-2 pl-5 bg-white rounded-md border-2 focus:border-2 focus:bg-green-100"
        name="currency"
        id="currency"
        onChange={handleChange}
      >
        {arrayCurrency.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectCurrency
