const Select = ({ value, onChange, placeholder = "Chọn", options = [] }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="border px-4 py-2 rounded-lg w-full bg-white"
    >
      <option value="">{placeholder}</option>
      {options.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default Select;
