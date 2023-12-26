const { Router } = require("express");
const Patient = require("../models/Patient");
const checkAuth = require("../middlewares/checkAuth");
const router = new Router();

router.get("/patients", checkAuth({ transient: true }), async (req, res, next) => {
  if (req.patient) {
    req.query.id = req.patient.id;
  }
  const patients = await Patient.findAll({
    where: req.query,
  });
  res.json(patients);
});

router.use(checkAuth());

router.post("/patients", async (req, res, next) => {
  try {
    res.status(201).json(await Patient.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.get("/patients/:id", async (req, res, next) => {
  if (req.patient.id !== parseInt(req.params.id)) return res.sendStatus(403);
  const patient = await Patient.findByPk(parseInt(req.params.id));
  if (!patient) res.sendStatus(404);
  else res.json(patient);
});

router.put("/patients/:id", async (req, res, next) => {
  try {
    const result = await Patient.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });
    const patient = await Patient.create({
      ...req.body,
      id: parseInt(req.params.id),
    });

    res.status(result ? 200 : 201).json(patient);
  } catch (e) {
    next(e);
  }
});

router.delete("/patients/:id", async (req, res, next) => {
  const result = await Patient.destroy({
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.sendStatus(result ? 204 : 404);
});

router.patch("/patients/:id", async (req, res, next) => {
  try {
    const [nbUpdated] = await Patient.update(req.body, {
      where: {
        id: parseInt(req.params.id),
      },
      individualHooks: true,
    });
    const patient = await Patient.findByPk(parseInt(req.params.id));
    if (patient) {
      res.status(200).json(patient);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;