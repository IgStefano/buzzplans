import Form from "@/components/form/plans/form";
import { PlanDataAPI } from "@/components/form/types/plans";
import { GetServerSideProps } from "next";

export default function NewPlan({ plan }: { plan: PlanDataAPI }) {
  return (
    <>
      <Form />
    </>
  );
}

export const getServerSideProps = (async (context) => {
  const res = await fetch(
    `http://localhost:3000/api/fetch-plan/${context.query.id}`,
  );
  const plan: PlanDataAPI = await res.json();

  return { props: { plan } };
}) satisfies GetServerSideProps<{ plan: PlanDataAPI }>;
