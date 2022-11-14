const express = require("express");
const userController = require("../controllers/User");
const router = express.Router();

router.get("/", userController.findAll); //get all users
router.get("/:id", userController.findOne); //get user by id
router.post("/", userController.create);  //create user
router.put("/:id", userController.update); //edit user properties
router.delete("/:id", userController.delete); //delete user

module.exports = router;
