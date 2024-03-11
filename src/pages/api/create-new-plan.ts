// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";
import { PlanData, PlanSchema } from "@/components/form/types/plans";

type PlanDataAPI = PlanData & { id: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const newData: PlanData = req.body;

  // Just making sure it won't crash due to reassigning
  if (newData?.startDate && newData?.endDate) {
    newData.startDate = new Date(newData.startDate);
    newData.endDate = new Date(newData.endDate);
  }

  const result = PlanSchema.safeParse(newData);

  if (result.success) {
    const file = await fs.readFile(process.cwd() + "/plans.json", "utf8");

    // User ID and Group ID for Node
    const uid = process.getuid && process.getuid();
    const gid = process.getgid && process.getgid();

    if (!uid || !gid) {
      throw new Error("Internal Server Error");
    }

    // This will allow plans.json to be written on by Node
    fs.chown(process.cwd() + "/plans.json", uid, gid);
    const data: PlanDataAPI[] = JSON.parse(file);
    Object.assign(newData, { id: crypto.randomUUID() });

    data.push(newData as PlanDataAPI);

    await fs.writeFile(
      process.cwd() + "/plans.json",
      JSON.stringify(data, null, 4),
    );

    res.status(201).json({
      code: 201,
      message: "Created Plan successfully.",
    });
  } else {
    res.status(400).json({
      code: 400,
      message: "Invalid plan received.",
      error: result.error.format(),
    });
  }
}
