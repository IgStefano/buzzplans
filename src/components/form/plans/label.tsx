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
      {text} {required && <span className="text-red-900"> *</span>}
    </label>
  );
}
