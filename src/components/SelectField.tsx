import React from "react";
import { useField } from "formik";

interface Option {
  value: number | string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  options: Option[];
}

const SelectField: React.FC<SelectFieldProps> = ({ label, name, options }) => {
  const [field, meta] = useField(name);

  return (
    <div>
      <label htmlFor={name} className="block text-lg font-medium text-gray-700">{label}</label>
      <select {...field} id={name} className="w-full border rounded-md p-2">
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error ? (
        <p className="text-red-500 text-sm">{meta.error}</p>
      ) : null}
    </div>
  );
};

export default SelectField;
