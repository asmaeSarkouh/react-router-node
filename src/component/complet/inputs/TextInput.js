import { useEffect, useState } from "react";

function TextInput({
  label,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
}) {
  const [id, setId] = useState("");
  useEffect(() => {
    setId("text_" + Math.ceil(Math.random() * 100000));
  }, []);
  return (
    <div >
      <label htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      
    </div>
  );
}

export default TextInput;
