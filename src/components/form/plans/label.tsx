/**
 * Component for labels in forms.
 * @param text - The text to be displayed on the label.
 * @param required - Whether or not this is a required field in the form. If so, it displays a red asterisk in front of the label.
 * @param htmlFor - The name of the element being labelled.
 */
export default function Label({
  text,
  required = false,
  htmlFor,
}: {
  text: string;
  required?: boolean;
  htmlFor: string;
}) {
  return (
    <label className="pb-1 text-xs font-semibold" htmlFor={htmlFor}>
      {text} {required && <span className="text-red-500"> *</span>}
    </label>
  );
}
