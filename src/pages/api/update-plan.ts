// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";
import { PlanDataAPI, PlanSchema } from "@/components/form/types/plans";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const updateData: PlanDataAPI = req.body;

  // Just making sure it won't crash due to reassigning
  if (updateData?.startDate && updateData?.endDate) {
    updateData.startDate = new Date(updateData.startDate);
    updateData.endDate = new Date(updateData.endDate);
  }

  if (!updateData.id) {
    res.status(400).json({
      code: 400,
      message: "Cannot update Plan without id",
    });
  }

  const result = PlanSchema.safeParse(updateData);

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

    const indexToUpdate = data.findIndex((item) => item.id === updateData.id);
    data[indexToUpdate] = updateData;

    await fs.writeFile(
      process.cwd() + "/plans.json",
      JSON.stringify(data, null, 4),
    );

    res.status(200).json({
      code: 200,
      message: "Updated Plan successfully.",
    });
  } else {
    res.status(400).json({
      code: 400,
      message: "Invalid Plan received.",
      error: result.error.format(),
    });
  }
}
