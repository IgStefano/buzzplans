import { FormFieldProps } from "../types/plans";
import ErrorMessage from "./errorMessage";
import Label from "./label";

/**
 * Reusable component for creating inputs for forms. This component was created based on React Hook Form primitives.
 * @param type - The type of the input; text, date, number, etc.
 * @param placeholder - The message to be displayed as a placeholder when the input is empty.
 * @param name - The name of this input.
 * @param register - The React Hook Form function corresponding to this form.
 * @param valueAsDate - Whether or not this input is for a Date.
 * @param label - The label to be appended above the input.
 * @param defaultValue - Value to be first loaded; used for updating forms.
 * @param required - Whether or not this is a required field in the form.
 */
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
