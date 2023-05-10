const { Router } = require("express");
const router = Router();
const User = require("../models/User.js");
// 7. Import middleware controller
const checkPasswordStrength = require("../middleware");

// 8. Add middleware controller to post request and run testing suite to demonstrate that your first two it blocks are now failing
router.post("/", checkPasswordStrength, async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({ user: user.username });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({});
    res.send({ users });
  } catch (error) {
    next(error);
  }
});

router.get("/:username", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
    });
    res.send({ user });
  } catch (error) {
    next(error);
  }
});

router.put("/:username", async (req, res, next) => {
  try {
    await User.update(req.body, { where: { username: req.params.username } });
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.delete("/:username", async (req, res, next) => {
  try {
    await User.destroy({ where: { username: req.params.username } });
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
