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

export type PlanDataAPI = PlanData & { id: string };

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<PlanData>;
  error: FieldError | undefined;
  valueAsDate?: boolean;
  label: string;
  required?: boolean;
};

export type ValidFieldNames = keyof PlanData;

// These are the restraints for the form. It is also what will inform other usages of this data structure (such as validating it in the API).

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
      .union([
        z.string().length(0, {
          message: "The participants' names must be longer than 3 characters",
        }),
        z
          .string()
          .min(3, {
            message: "The participants' names must be longer than 3 characters",
          })
          .max(300, {
            message:
              "The participants' names cannot be longer than 300 characters",
          })
          .trim(),
      ])
      .optional()
      .transform((data) => (data === "" ? undefined : data)),
    location: z
      .string()
      .min(2, {
        message: "The location's name must be longer than 2 characters",
      })
      .max(128, {
        message: "The location's name cannot be longer than 128 characters",
      })
      .trim(),
    startDate: z.coerce
      .date({
        invalid_type_error:
          "We haven't received a valid date, please try again",
      })
      .refine(
        (data) =>
          // this mouthful of a condition is making sure to "normalize" the date. Since we receive YYYY-MM-DD from the Form (without hours, minutes, seconds or miliseconds), we need to compare it to a similar new Date. It is also necessary to make sure all values are using UTC to negate timezone effects.
          new Date(
            data.getUTCFullYear(),
            data.getUTCMonth(),
            data.getUTCDate(),
          ).getTime() >=
          new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate(),
            0,
            0,
            0,
            0,
          ).getTime(),
        {
          message: "The start date cannot be earlier than today.",
        },
      ),
    endDate: z.coerce.date({
      invalid_type_error: "We haven't received a valid date, please try again",
    }),
  })
  .refine((data) => data.endDate.getTime() >= data.startDate.getTime(), {
    path: ["endDate"],
    message: "End date cannot be earlier than start date.",
  });

export const PlanAPISchema: ZodType<PlanDataAPI> = z.object({
  id: z.string().uuid(),
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
    .union([
      z.string().length(0, {
        message: "The participants' names must be longer than 3 characters",
      }),
      z
        .string()
        .min(3, {
          message: "The participants' names must be longer than 3 characters",
        })
        .max(300, {
          message:
            "The participants' names cannot be longer than 300 characters",
        })
        .trim(),
    ])
    .optional()
    .transform((data) => (data === "" ? undefined : data)),
  location: z
    .string()
    .min(2, {
      message: "The location's name must be longer than 2 characters",
    })
    .max(128, {
      message: "The location's name cannot be longer than 128 characters",
    })
    .trim(),
  startDate: z.coerce
    .date({
      invalid_type_error: "We haven't received a valid date, please try again",
    })
    .refine(
      (data) =>
        // this mouthful of a condition is making sure to "normalize" the date. Since we receive YYYY-MM-DD from the Form (without hours, minutes, seconds or miliseconds), we need to compare it to a similar new Date. It is also necessary to make sure all values are using UTC to negate timezone effects.
        new Date(
          data.getUTCFullYear(),
          data.getUTCMonth(),
          data.getUTCDate(),
        ).getTime() >=
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          0,
          0,
          0,
          0,
        ).getTime(),
      {
        message: "The start date cannot be earlier than today.",
      },
    ),
  endDate: z.coerce.date({
    invalid_type_error: "We haven't received a valid date, please try again",
  }),
});
