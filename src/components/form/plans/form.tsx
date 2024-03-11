import { useForm } from "react-hook-form";
import FormFieldInput from "./formFieldInput";
import { PlanData, PlanSchema } from "../types/plans";
import classNames from "classnames";
import { radioCanada } from "@/styles/fonts";
import { zodResolver } from "@hookform/resolvers/zod";
import FormFieldTextarea from "./formFieldTextarea";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlanData>({
    resolver: zodResolver(PlanSchema),
  });

  const onSubmit = async (data: PlanData) => {
    console.log("SUCCESS", data);
  };

  return (
    <form
      id="new-plan-form"
      onSubmit={handleSubmit(onSubmit)}
      className="w-full px-4 sm:px-8"
    >
      <div className="flex w-full flex-col">
        <h1
          className={classNames(
            "mb-4 text-center text-3xl font-bold capitalize",
            radioCanada.className,
          )}
        >
          Plan Your Holiday!
        </h1>
        <FormFieldInput
          label="Title"
          type="text"
          placeholder="Name of the holiday"
          name="title"
          required
          register={register}
          error={errors.title}
        />

        <FormFieldTextarea
          label="Description"
          placeholder="Describe what you're going to do in your holiday right here"
          name="description"
          required
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
          register={register}
          error={errors.endDate}
        />

        <FormFieldInput
          label="Location"
          type="text"
          placeholder="Where are you going on this holiday?"
          name="location"
          required
          register={register}
          error={errors.location}
        />

        <FormFieldInput
          label="Participants"
          type="text"
          placeholder="Who's going?"
          name="participants"
          register={register}
          error={errors.participants}
        />
        <button
          type="submit"
          className="mb-4 flex h-4 items-center justify-center rounded-lg bg-red-500 p-4 text-neutral-50 transition-all duration-300 hover:opacity-80 focus:opacity-80 focus:outline focus:outline-1 focus:outline-neutral-900"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
