import { useEffect, useState } from "react";

function SelectInput({
  label,
  placeholder,
  name,
  value,
  onChange,
  choices = [],
}) {
  const [id, setId] = useState("");
  useEffect(() => {
    setId("select_" + Math.ceil(Math.random() * 100000));
  }, []);
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <select
        className="form-select"
        aria-label="Default select example"
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="">{placeholder}</option>
        {choices.map((c, index) => (
          <option value={c.value} key={id + index}>
            {c.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
