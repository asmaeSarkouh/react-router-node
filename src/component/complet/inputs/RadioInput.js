import { useEffect, useState } from "react";

function RadioInput({ label, name, value, onChange, choices = [] }) {
  const [id, setId] = useState("");
  useEffect(() => {
    setId("radio_" + Math.ceil(Math.random() * 100000));
  }, []);
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label> <br />
      {choices.map((c, index) => (
        <div className="form-check form-check-inline" key={id + index}>
          <input
            className="form-check-input"
            type="radio"
            id={id + index}
            name={name}
            value={c.value}
            checked={value === c.value}
            onChange={onChange}
          />
          <label className="form-check-label" htmlFor={id + index}>
            {c.label}
          </label>
        </div>
      ))}
    </div>
  );
}

export default RadioInput;
