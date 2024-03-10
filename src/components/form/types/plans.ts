import { FieldError, UseFormRegister } from "react-hook-form";
import { ZodType, z } from "zod";

export type PlanData = {
  title: string;
  description: string;
  participants?: string;
  location: string;
  startDate: Date;
  endDate: Date;
};

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<PlanData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  label: string;
  required?: boolean;
};

export type ValidFieldNames = keyof PlanData;

export const PlanSchema: ZodType<PlanData> = z
  .object({
    title: z
      .string()
      .min(3, { message: "The title must be longer than 3 characters" })
      .max(128, { message: "The title cannot be longer than 128 characters" }),
    description: z
      .string()
      .min(3, { message: "The description must be longer than 3 characters" })
      .max(2000, {
        message: "The description cannot be longer than 2000 characters",
      })
      .trim(),
    participants: z
      .string()
      .min(3, {
        message: "The participants' names must be longer than 3 characters",
      })
      .max(300, {
        message: "The participants' names cannot be longer than 300 characters",
      })
      .trim()
      .optional(),
    location: z
      .string()
      .min(2, {
        message: "The location's name must be longer than 2 characters",
      })
      .max(128, {
        message: "The location's name cannot be longer than 128 characters",
      })
      .trim(),
    startDate: z
      .date({
        invalid_type_error:
          "We haven't received a valid date, please try again",
      })
      .min(new Date(), {
        message: "The start date cannot be earlier than today.",
      }),
    endDate: z
      .date({
        invalid_type_error:
          "We haven't received a valid date, please try again",
      })
      .min(new Date(), {
        message: "The end date cannot be earlier than today.",
      }),
  })
  .superRefine((data, ctx) => {
    if (data.endDate < data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "End date cannot be earlier than start date.",
      });
    }
  });
