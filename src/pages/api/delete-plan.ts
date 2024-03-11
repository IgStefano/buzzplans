// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";
import { PlanDataAPI } from "@/components/form/types/plans";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const deleteData: { id: string } = req.body;

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
  const indexToDelete = data.findIndex((item) => item.id === deleteData.id);
  const updatedData = data.filter((_, index) => index !== indexToDelete);

  await fs.writeFile(
    process.cwd() + "/plans.json",
    JSON.stringify(updatedData, null, 4),
  );

  res.status(200).json({
    code: 200,
    message: "Deleted Plan successfully.",
  });
}
