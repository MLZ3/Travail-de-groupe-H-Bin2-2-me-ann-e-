const { Router } = require("express");
const Docteur = require("../models/Docteur");
const checkAuth = require("../middlewares/checkAuth");
const router = new Router();

router.get("/docteurs", checkAuth({ transient: true }), async (req, res, next) => {
  if (req.docteur) {
    req.query.id = req.docteur.id;
  }
  const docteurs = await Docteur.findAll({
    where: req.query,
  });
  res.json(docteurs);
});

router.use(checkAuth());

router.post("/docteurs", async (req, res, next) => {
  try {
    res.status(201).json(await Docteur.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.get("/docteurs/:id", async (req, res, next) => {
  if (req.docteur.id !== parseInt(req.params.id)) return res.sendStatus(403);
  const docteur = await Docteur.findByPk(parseInt(req.params.id));
  if (!docteur) res.sendStatus(404);
  else res.json(docteur);
});

router.put("/docteurs/:id", async (req, res, next) => {
  try {
    const result = await Docteur.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });
    const docteur = await Docteur.create({
      ...req.body,
      id: parseInt(req.params.id),
    });

    res.status(result ? 200 : 201).json(docteur);
  } catch (e) {
    next(e);
  }
});

router.delete("/docteurs/:id", async (req, res, next) => {
  const result = await Docteur.destroy({
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.sendStatus(result ? 204 : 404);
});

router.patch("/docteurs/:id", async (req, res, next) => {
  try {
    const [nbUpdated] = await Docteur.update(req.body, {
      where: {
        id: parseInt(req.params.id),
      },
      individualHooks: true,
    });
    const docteur = await Docteur.findByPk(parseInt(req.params.id));
    if (docteur) {
      res.status(200).json(docteur);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;