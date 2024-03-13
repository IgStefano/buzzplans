import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  variant: "pdf" | "update" | "delete";
}

/**
 * Component for the buttons used in the Card component.
 * @param variant - The variant of the button to be used. Decides which markup is rendered.
 */
export default function Button({ variant, ...rest }: ButtonProps) {
  switch (variant) {
    case "pdf":
      return (
        <button
          className="rounded-full bg-red-300 p-2 text-neutral-50 outline outline-2 outline-red-50 transition-all duration-300 hover:opacity-80 hover:outline-red-300 focus:opacity-80 focus:outline-red-300"
          title="Print this Plan"
          {...rest}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M224 152a8 8 0 0 1-8 8h-24v16h16a8 8 0 0 1 0 16h-16v16a8 8 0 0 1-16 0v-56a8 8 0 0 1 8-8h32a8 8 0 0 1 8 8M92 172a28 28 0 0 1-28 28h-8v8a8 8 0 0 1-16 0v-56a8 8 0 0 1 8-8h16a28 28 0 0 1 28 28m-16 0a12 12 0 0 0-12-12h-8v24h8a12 12 0 0 0 12-12m88 8a36 36 0 0 1-36 36h-16a8 8 0 0 1-8-8v-56a8 8 0 0 1 8-8h16a36 36 0 0 1 36 36m-16 0a20 20 0 0 0-20-20h-8v40h8a20 20 0 0 0 20-20M40 112V40a16 16 0 0 1 16-16h96a8 8 0 0 1 5.66 2.34l56 56A8 8 0 0 1 216 88v24a8 8 0 0 1-16 0V96h-48a8 8 0 0 1-8-8V40H56v72a8 8 0 0 1-16 0m120-32h28.69L160 51.31Z"
            />
          </svg>
        </button>
      );
    case "update":
      return (
        <button
          className="flex items-center justify-center rounded-full bg-emerald-500 p-2 text-neutral-50 outline outline-2 outline-emerald-50 transition-all duration-300 hover:opacity-80 hover:outline-emerald-500 focus:opacity-80 focus:outline-emerald-500"
          title="Update this Plan"
          {...rest}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z"
            />
          </svg>
        </button>
      );
    case "delete":
      return (
        <button
          className="absolute right-4 top-4 rounded-full bg-red-700 p-1 text-neutral-50 outline outline-2 outline-red-50 transition-all duration-300 hover:opacity-80 hover:outline-red-700 focus:opacity-80 focus:outline-red-700"
          title="Delete this Plan"
          {...rest}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
            />
          </svg>
        </button>
      );
  }
}
