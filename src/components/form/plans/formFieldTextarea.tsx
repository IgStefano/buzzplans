import { FormFieldProps } from "../types/plans";
import ErrorMessage from "./errorMessage";
import Label from "./label";

/**
 * Reusable component for creating textareas for forms. This component was created based on React Hook Form primitives.
 * @param placeholder - The message to be displayed as a placeholder when the textarea is empty.
 * @param name - The name of this textarea.
 * @param register - The React Hook Form function corresponding to this form.
 * @param label - The label to be appended above the textarea.
 * @param defaultValue - Value to be first loaded; used for updating forms.
 * @param required - Whether or not this is a required field in the form.
 */
export default function FormFieldTextarea({
  placeholder,
  name,
  register,
  error,
  label,
  required,
  defaultValue = "",
}: Omit<FormFieldProps, "type">) {
  return (
    <div className="mb-4">
      <Label text={label} required={required} htmlFor={name} />
      <textarea
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="h-32 w-full resize-none rounded border border-neutral-50 p-2 text-xs outline-none outline-0 transition-all duration-300 focus-visible:border-solid focus-visible:border-emerald-500  disabled:bg-neutral-200 disabled:text-neutral-900 disabled:opacity-80"
        {...register(name)}
      />
      {error && error.message && <ErrorMessage message={error.message} />}
    </div>
  );
}
