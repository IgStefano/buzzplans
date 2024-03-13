import Link from "next/link";
import { PlanDataAPI } from "../form/types/plans";
import Button from "./button";
import { useRouter } from "next/router";

/**
 * Card component used in the listing. It is responsible for displaying all information about a single Plan, as well as supplying action buttons for editing, deleting and creating a PDF version of it.
 * @param id - UUID relating to this specific Plan.
 * @param title - The title of this plan.
 * @param description - Complete description of the holiday Plan. Has up to 2000 characters.
 * @param startDate - The Date when the Plan is scheduled to start.
 * @param endDate - The Date when the Plan is scheduled to end.
 * @param location - The name of the place related to the Plan.
 * @param participants - Optional. The names of the participants involved in this Plan.
 */
export default function Card({
  id,
  title,
  description,
  startDate,
  endDate,
  location,
  participants = undefined,
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
          <Button variant="update" />
        </Link>
      </div>
      <Button onClick={attemptDeletion} variant="delete" />
    </article>
  );
}
