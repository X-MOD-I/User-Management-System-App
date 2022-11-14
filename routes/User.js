const express = require("express");
const userController = require("../controllers/User");
const router = express.Router();

router.get("/", userController.findAll); //show user list
router.get("/:id", userController.findOne);
router.post("/", userController.create);
router.put("/:id", userController.update); //edit user functionality
router.delete("/:id", userController.delete); //delete single user functionality

module.exports = router;
