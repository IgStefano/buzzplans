import { FormFieldProps } from "../types/plans";
import ErrorMessage from "./errorMessage";
import Label from "./label";

export default function FormFieldInput({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  label,
  required = false,
}: FormFieldProps) {
  const variants = {
    base: "w-full rounded border outline-none outline-0 border-gray-50 p-2 text-xs transition-all duration-300 focus-visible:border-solid focus-visible:border-red-500 disabled:bg-gray-200 disabled:text-gray-900 disabled:opacity-80 mb-4",
  } as const;

  return (
    <>
      <Label text={label} required={required} htmlFor={name} />
      <input
        type={type}
        placeholder={placeholder}
        className={variants.base}
        {...register(name, { valueAsNumber })}
      />
      {error && error.message && <ErrorMessage message={error.message} />}
    </>
  );
}
