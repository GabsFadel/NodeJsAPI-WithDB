const ApiPerson = require("../api/person");
const express = require("express");

const router = express.Router();

router.get("/", ApiPerson.FindAll);
router.get("/:id", ApiPerson.FindById);
router.post("/", ApiPerson.Create);
router.put("/:id", ApiPerson.Update);
router.delete("/:id", ApiPerson.Delete);

module.exports = router; 