import { Medication } from "../models/Medication.js";

router.post("/:id", auth, async (req, res) => {
  const dose = await Dose.findByPk(req.params.id, { include: Medication });

  dose.status = req.body.status;
  dose.logged_at = new Date();

  if (req.body.status === "taken") {
    dose.Medication.stock -= 1;
    await dose.Medication.save();
  }

  await dose.save();
  res.json({
    success: true,
    lowStock: dose.Medication.stock <= 5
  });
});
