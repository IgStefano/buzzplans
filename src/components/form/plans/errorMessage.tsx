export default function ErrorMessage({ message }: { message: string }) {
  return <span className="-mt-2 pb-4 text-xs text-red-400">{message}</span>;
}
