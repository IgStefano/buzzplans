// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";
import { PlanAPISchema, PlanDataAPI } from "@/components/form/types/plans";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const file = await fs.readFile(process.cwd() + "/plans.json", "utf8");
  const data: PlanDataAPI[] = JSON.parse(file);

  const result = data.filter((item) => {
    const parse = PlanAPISchema.safeParse(item);
    return parse.success;
  });

  if (result.length > 0) {
    res.status(200).json(data);
  } else {
    res.status(500).json({
      code: 500,
      message: "Failure to get Plans data",
    });
  }
}
