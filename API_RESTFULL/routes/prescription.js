const { Router } = require("express");
const Prescription = require("../models/Prescription");
const checkAuth = require("../middlewares/checkAuth");
const router = new Router();

router.get("/prescriptions", checkAuth({ transient: true }), async (req, res, next) => {
  if (req.prescription) {
    req.query.id = req.prescription.id;
  }
  const prescriptions = await Prescription.findAll({
    where: req.query,
  });
  res.json(prescriptions);
});

router.use(checkAuth());

router.post("/prescriptions", async (req, res, next) => {
  try {
    res.status(201).json(await Prescription.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.get("/prescriptions/:id", async (req, res, next) => {
  if (req.prescription.id !== parseInt(req.params.id)) return res.sendStatus(403);
  const prescription = await Prescription.findByPk(parseInt(req.params.id));
  if (!prescription) res.sendStatus(404);
  else res.json(prescription);
});

router.put("/prescriptions/:id", async (req, res, next) => {
  try {
    const result = await Prescription.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });
    const prescription = await Prescription.create({
      ...req.body,
      id: parseInt(req.params.id),
    });

    res.status(result ? 200 : 201).json(prescription);
  } catch (e) {
    next(e);
  }
});

router.delete("/prescriptions/:id", async (req, res, next) => {
  const result = await Prescription.destroy({
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.sendStatus(result ? 204 : 404);
});

router.patch("/prescriptions/:id", async (req, res, next) => {
  try {
    const [nbUpdated] = await Prescription.update(req.body, {
      where: {
        id: parseInt(req.params.id),
      },
      individualHooks: true,
    });
    const prescription = await Prescription.findByPk(parseInt(req.params.id));
    if (prescription) {
      res.status(200).json(prescription);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;