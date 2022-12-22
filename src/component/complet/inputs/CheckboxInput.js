import { useEffect, useState } from "react";

function CheckboxInput({
  label,
  label_checked,
  label_unchecked,
  name,
  value,
  onChange,
}) {
  const [id, setId] = useState("");
  useEffect(() => {
    setId("checkbox_" + Math.ceil(Math.random() * 100000));
  }, []);
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>

      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          checked={value}
          id={id}
          name={name}
          onChange={onChange}
        />
        <label className="form-check-label" htmlFor={id}>
          {value ? label_checked : label_unchecked}
        </label>
      </div>
    </div>
  );
}

export default CheckboxInput;
