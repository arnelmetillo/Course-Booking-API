const express = require("express")
const router = express.Router();
const User = require("../models/User.js");
const userController = require("../controllers/userController.js")

// routes folder - is where all http method and endpoints are located

router.post("/checkEmail", (req, res) => {
	userController.checkEmailExists(req.body).then(resultFromController => res.send(resultFromController));
})

router.post("/register", (req, res) => {
	userController.registerUser(req.body).then(resultFromController => res.send(resultFromController));
})

router.post("/login", (req, res) => {
	userController.loginUser(req.body).then(resultFromController => res.send(resultFromController));
})

// S38 Activity - Code Along
router.post("/details", (req, res) => {
	userController.getProfile({userId: req.body.id}).then(resultFromController => res.send(resultFromController));
})

module.exports = router;