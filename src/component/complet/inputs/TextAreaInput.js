import { useEffect, useState } from "react";

function TextAreaInput({ label, placeholder, name, value, onChange }) {
  const [id, setId] = useState("");
  useEffect(() => {
    setId("textarea_" + Math.ceil(Math.random() * 100000));
  }, []);
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <textarea
        class="form-control m-2"
        cols="150"
        rows="5"
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
}

export default TextAreaInput;
