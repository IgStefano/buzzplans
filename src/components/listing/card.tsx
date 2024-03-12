import Link from "next/link";
import { PlanDataAPI } from "../form/types/plans";
import Button from "./button";
import { useRouter } from "next/router";

export default function Card({
  id,
  title,
  description,
  startDate,
  endDate,
  location,
  participants,
}: PlanDataAPI) {
  const router = useRouter();
  const attemptDeletion = () => {
    router.push(`?delete=${id}`);
  };

  return (
    <article className="relative flex w-full flex-col gap-2 rounded-md border p-4">
      <h2
        title={title}
        className="line-clamp-1 max-w-[85%] text-center text-2xl"
      >
        {title}
      </h2>
      <p title={description} className="line-clamp-2 text-ellipsis">
        {description}
      </p>
      <p>Start: {new Date(startDate).toLocaleDateString("en-US")}</p>
      <p>End: {new Date(endDate).toLocaleDateString("en-US")}</p>
      <p>Where: {location}</p>
      {participants && (
        <p className="line-clamp-1" title={participants}>
          Who&apos;s going: {participants}
        </p>
      )}
      <div className="flex items-center justify-between">
        <Link href={`/print/${id}/`}>
          <Button variant="pdf" />
        </Link>
        <Link href={`/edit-plan/${id}/`}>
          <Button variant="edit" />
        </Link>
      </div>
      <Button onClick={attemptDeletion} variant="delete" />
    </article>
  );
}
