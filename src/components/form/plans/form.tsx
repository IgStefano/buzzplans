import { useForm } from "react-hook-form";
import FormFieldInput from "./formFieldInput";
import {
  PlanAPISchema,
  PlanData,
  PlanDataAPI,
  PlanSchema,
} from "../types/plans";
import classNames from "classnames";
import { caveat } from "@/styles/fonts";
import { zodResolver } from "@hookform/resolvers/zod";
import FormFieldTextarea from "./formFieldTextarea";
import { api } from "@/services/api";
import { useState } from "react";
import { useRouter } from "next/router";

interface FormCreateProps {
  type: "create";
}

interface FormEditProps {
  type: "edit";
  data: PlanDataAPI;
}

type FormProps = FormCreateProps | FormEditProps;

export default function Form(props: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlanData | PlanDataAPI>({
    resolver: zodResolver(PlanSchema),
  });

  const [shouldDisableButton, setShouldDisableButton] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: PlanData | PlanDataAPI) => {
    setShouldDisableButton(true);
    if (props.type === "create") {
      await api({ action: "create", data });
      setShouldDisableButton(false);
      router.push("/");
    }

    if (props.type === "edit") {
      Object.assign(props.data, data);
      await api({ action: "update", data: props.data });
      setShouldDisableButton(false);
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full px-4 sm:px-8">
      <div className="flex w-full flex-col">
        <h2
          className={classNames(
            "mb-4 text-center text-3xl font-bold capitalize",
            caveat.className,
          )}
        >
          {props.type === "create"
            ? "Plan Your Holiday!"
            : "Update Your Plans!"}
        </h2>
        <p className="text-center text-neutral-500">
          Fill out the fields below to save your holiday plans!
        </p>
        <FormFieldInput
          label="Title"
          type="text"
          placeholder="Name of the holiday"
          name="title"
          required
          defaultValue={props.type === "edit" ? props.data.title : ""}
          register={register}
          error={errors.title}
        />

        <FormFieldTextarea
          label="Description"
          placeholder="Describe what you're going to do in your holiday right here"
          name="description"
          required
          defaultValue={props.type === "edit" ? props.data.description : ""}
          register={register}
          error={errors.description}
        />

        <FormFieldInput
          label="Start Date"
          type="date"
          placeholder="When are you going on this holiday?"
          name="startDate"
          required
          valueAsDate
          defaultValue={
            props.type === "edit"
              ? // Hacky but effective way to get the date in YYYY-MM-DD format
                new Date(props.data.startDate).toISOString().slice(0, 10)
              : ""
          }
          register={register}
          error={errors.startDate}
        />

        <FormFieldInput
          label="End Date"
          type="date"
          placeholder="When are you planning to finish your holiday?"
          name="endDate"
          required
          valueAsDate
          defaultValue={
            props.type === "edit"
              ? new Date(props.data.endDate).toISOString().slice(0, 10)
              : ""
          }
          register={register}
          error={errors.endDate}
        />

        <FormFieldInput
          label="Location"
          type="text"
          placeholder="Where are you going on this holiday?"
          name="location"
          required
          defaultValue={props.type === "edit" ? props.data.location : ""}
          register={register}
          error={errors.location}
        />

        <FormFieldInput
          label="Participants"
          type="text"
          placeholder="Who's going?"
          name="participants"
          defaultValue={
            props.type === "edit" && props.data.participants
              ? props.data.participants
              : ""
          }
          register={register}
          error={errors.participants}
        />
        <button
          type="submit"
          className="mb-4 flex h-4 items-center justify-center rounded-lg bg-red-500 p-4 text-neutral-50 transition-all duration-300 hover:opacity-80 focus:opacity-80 focus:outline focus:outline-1 focus:outline-neutral-900 disabled:bg-black/40 disabled:outline-none disabled:hover:opacity-100"
          disabled={shouldDisableButton}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
