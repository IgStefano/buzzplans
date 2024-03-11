import useOutsideClickRef from "@/hooks/useOutsideClickRef";
import classNames from "classnames";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

export default function Modal({
  isModalOpen,
  setIsModalOpen,
  label,
  action,
}: {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  label: string;
  action: () => void | Promise<void>;
}) {
  const modalRef = useOutsideClickRef({ setIsOpen: setIsModalOpen });
  const router = useRouter();

  return (
    <section
      role="dialog"
      className={classNames(
        "absolute right-0 top-0 flex h-full w-full items-center justify-center bg-black/80 transition-all duration-300",
        !isModalOpen && "pointer-events-none opacity-0",
      )}
    >
      <div
        ref={modalRef}
        role="dialog"
        className="relative flex max-h-[85vh] w-[80vw] flex-col items-center justify-center gap-4 rounded-lg bg-neutral-50 p-6 sm:w-[60vw] md:w-[40vw]"
      >
        <h3
          className={classNames(
            "text-md mx-2 w-full text-center uppercase text-neutral-500 md:text-lg",
          )}
        >
          {label}
        </h3>
        <div className="flex w-full justify-between">
          <button
            onClick={() => {
              action();
              setIsModalOpen(false);
              router.replace("/");
            }}
            className="rounded-full bg-red-700 p-2 text-neutral-50 outline outline-2 outline-red-50 transition-all duration-300 hover:opacity-80 hover:outline-red-700 focus:opacity-80 focus:outline-red-700"
          >
            Confirm
          </button>
          <button
            onClick={() => {
              setIsModalOpen(false);
              router.replace("/");
            }}
            className="rounded-full bg-neutral-700 p-2 text-neutral-50 outline outline-2 outline-neutral-50 transition-all duration-300 hover:opacity-80 hover:outline-neutral-700 focus:opacity-80 focus:outline-neutral-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
}
