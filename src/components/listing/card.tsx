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
      <p className="line-clamp-2 text-ellipsis">{description}</p>
      <p>Start: {new Date(startDate).toLocaleDateString("en-US")}</p>
      <p>End: {new Date(endDate).toLocaleDateString("en-US")}</p>
      <p>Where: {location}</p>
      <div className="flex items-center justify-between">
        <Button variant="pdf" />
        <Link href={`/edit-plan/${id}/`}>
          <Button variant="edit" />
        </Link>
      </div>
      <Button onClick={attemptDeletion} variant="delete" />
    </article>
  );
}
