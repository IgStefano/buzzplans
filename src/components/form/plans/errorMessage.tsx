/**
 * Component for error messages in forms.
 * @param message - The message to be displayed when an error is found.
 */
export default function ErrorMessage({ message }: { message: string }) {
  return (
    <span title={message} className="text-xs text-red-400">
      {message}
    </span>
  );
}
