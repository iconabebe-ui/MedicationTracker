import express from "express";

const router = express.Router();

let medications = [
  { id: 1, name: "Paracetamol", dosage: "500mg", time: "08:00" }
];

let nextId = 2;

/* GET all medications */
router.get("/", (req, res) => {
  res.json(medications);
});

/* POST new medication */
router.post("/", (req, res) => {
  const { name, dosage, time } = req.body;

  if (!name || !dosage || !time) {
    return res.status(400).json({
      message: "All fields (name, dosage, time) are required"
    });
  }

  const newMedication = {
    id: nextId++,
    name,
    dosage,
    time
  };

  medications.push(newMedication);

  res.status(201).json({
    message: "Medication added successfully",
    medication: newMedication
  });
});

/* DELETE medication */
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = medications.findIndex(m => m.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Medication not found" });
  }

  const deleted = medications.splice(index, 1);

  res.json({
    message: "Medication deleted successfully",
    medication: deleted[0]
  });
});

/* UPDATE medication */
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, dosage, time } = req.body;

  const medication = medications.find(m => m.id === id);
  if (!medication) {
    return res.status(404).json({ message: "Medication not found" });
  }

  if (name) medication.name = name;
  if (dosage) medication.dosage = dosage;
  if (time) medication.time = time;

  res.json({
    message: "Medication updated successfully",
    medication
  });
});

export default router;

