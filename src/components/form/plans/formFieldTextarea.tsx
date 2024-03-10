import { FormFieldProps } from "../types/plans";
import ErrorMessage from "./errorMessage";
import Label from "./label";

export default function FormFieldTextarea({
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  label,
  required,
}: FormFieldProps) {
  return (
    <>
      <Label text={label} required={required} htmlFor={name} />
      <textarea
        placeholder={placeholder}
        className="mb-4 h-32 w-full resize-none rounded border border-neutral-50 p-2 text-xs outline-none outline-0 transition-all duration-300 focus-visible:border-solid focus-visible:border-emerald-500  disabled:bg-neutral-200 disabled:text-neutral-900 disabled:opacity-80"
        {...register(name, { valueAsNumber })}
      />
      {error && error.message && <ErrorMessage message={error.message} />}
    </>
  );
}
