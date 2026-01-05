import cron from "node-cron";
import { Dose } from "../models/Dose.js";

export function startScheduler() {
  cron.schedule("* * * * *", async () => {
    await Dose.update(
      { status: "pending" },
      { where: { scheduledAt: { $lte: new Date() } } }
    );
  });
}
