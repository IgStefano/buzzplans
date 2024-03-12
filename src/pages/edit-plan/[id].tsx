import Form from "@/components/form/plans/form";
import { PlanDataAPI } from "@/components/form/types/plans";
import { api } from "@/services/api";
import { GetServerSideProps } from "next";

export default function EditPlan({ plan }: { plan: PlanDataAPI }) {
  return (
    <>
      <Form type="edit" data={plan} />
    </>
  );
}

export const getServerSideProps = (async (context) => {
  const res = await api({ action: "fetch", id: context.query.id as string });
  const plan: PlanDataAPI = await res.json();

  return { props: { plan } };
}) satisfies GetServerSideProps<{ plan: PlanDataAPI }>;
