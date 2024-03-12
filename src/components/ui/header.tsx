import { caveat } from "@/styles/fonts";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

/**
 * Real simple Header for the whole app. It displays the name of the site and provides a link for the listing whenever the user isn't located there for navigation.
 */
export default function Header() {
  const router = useRouter();
  return (
    <header
      className={classNames(
        "transparent w-full rounded-b-lg bg-red-800 px-6 py-4 text-center text-5xl text-gray-50",
        caveat.className,
      )}
    >
      {router.pathname !== "/" ? (
        <Link href="/" title="Return to Plans">
          <h1>Buzzplans</h1>
        </Link>
      ) : (
        <h1>Buzzplans</h1>
      )}
    </header>
  );
}
