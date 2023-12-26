const { Router } = require("express");
const Rdv = require("../models/Rdv");
const checkAuth = require("../middlewares/checkAuth");
const router = new Router();

router.get("/rdvs", checkAuth({ transient: true }), async (req, res, next) => {
  if (req.rdv) {
    req.query.id = req.rdv.id;
  }
  const rdvs = await Rdv.findAll({
    where: req.query,
  });
  res.json(rdvs);
});

router.use(checkAuth());

router.post("/rdvs", async (req, res, next) => {
  try {
    res.status(201).json(await Rdv.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.get("/rdvs/:id", async (req, res, next) => {
  if (req.rdv.id !== parseInt(req.params.id)) return res.sendStatus(403);
  const rdv = await Rdv.findByPk(parseInt(req.params.id));
  if (!rdv) res.sendStatus(404);
  else res.json(rdv);
});

router.put("/rdvs/:id", async (req, res, next) => {
  try {
    const result = await Rdv.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });
    const rdv = await Rdv.create({
      ...req.body,
      id: parseInt(req.params.id),
    });

    res.status(result ? 200 : 201).json(rdv);
  } catch (e) {
    next(e);
  }
});

router.delete("/rdvs/:id", async (req, res, next) => {
  const result = await Rdv.destroy({
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.sendStatus(result ? 204 : 404);
});

router.patch("/rdvs/:id", async (req, res, next) => {
  try {
    const [nbUpdated] = await Rdv.update(req.body, {
      where: {
        id: parseInt(req.params.id),
      },
      individualHooks: true,
    });
    const rdv = await Rdv.findByPk(parseInt(req.params.id));
    if (rdv) {
      res.status(200).json(rdv);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;