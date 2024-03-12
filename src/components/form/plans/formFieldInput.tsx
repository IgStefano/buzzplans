import { FormFieldProps } from "../types/plans";
import ErrorMessage from "./errorMessage";
import Label from "./label";

export default function FormFieldInput({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsDate,
  label,
  defaultValue = "",
  required = false,
}: FormFieldProps) {
  return (
    <div className="mb-4">
      <Label text={label} required={required} htmlFor={name} />
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full rounded border border-gray-50 p-2 text-xs outline-none outline-0 transition-all duration-300 focus-visible:border-solid focus-visible:border-emerald-500 disabled:bg-gray-200 disabled:text-gray-900 disabled:opacity-80"
        {...register(name, { valueAsDate })}
      />
      {error && error.message && <ErrorMessage message={error.message} />}
    </div>
  );
}
