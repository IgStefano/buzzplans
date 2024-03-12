import { PlanDataAPI } from "@/components/form/types/plans";
import Card from "@/components/listing/card";
import Modal from "@/components/ui/modal";
import { api } from "@/services/api";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home({ plans }: { plans: PlanDataAPI[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const finishDeletion = async () => {
    if (router.query.delete) {
      await api({ action: "delete", id: router.query.delete as string });
    }
  };

  useEffect(() => {
    if (router.query.delete) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [router.query]);

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <p>Here are your planned holidays!</p>
        <Link href="/new-plan">
          <button className="flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-neutral-50 outline outline-2 outline-emerald-50 transition-all duration-300 hover:opacity-80 hover:outline-emerald-500 focus:opacity-80 focus:outline-emerald-500">
            Plan a New Holiday
          </button>
        </Link>
      </div>
      <section className="grid w-full grid-cols-1 gap-8 pb-8 sm:grid-cols-2 md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            id={plan.id}
            title={plan.title}
            description={plan.description}
            startDate={plan.startDate}
            endDate={plan.endDate}
            location={plan.location}
            participants={plan.participants}
          />
        ))}
      </section>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        label="Are you sure you want to delete this planned holiday?"
        action={finishDeletion}
      />
    </>
  );
}

export const getServerSideProps = (async () => {
  const res = await api({ action: "get" });
  const plans: PlanDataAPI[] = await res.json();

  return { props: { plans } };
}) satisfies GetServerSideProps<{ plans: PlanDataAPI[] }>;
