const ApiUser = require("../api/user");
const express = require("express");

const router = express.Router();

router.get("/", ApiUser.FindAll);
router.get("/:id", ApiUser.FindById);
router.post("/", ApiUser.Create);
router.put("/:id", ApiUser.Update);
router.delete("/:id", ApiUser.Delete);

module.exports = router; 