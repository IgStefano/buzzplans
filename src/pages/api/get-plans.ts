// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";
import { PlanData, PlanSchema } from "@/components/form/types/plans";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PlanData[]>
) {
  const file = await fs.readFile(process.cwd() + "/plans.json", "utf8");
  const data: PlanData[] = JSON.parse(file);

  const result = PlanSchema.safeParse(data);

  if (result.success) {
    res.status(200).json(data);
  } else {
    res.status(500);
  }
}
