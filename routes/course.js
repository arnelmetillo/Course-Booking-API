const express = require("express")
const router = express.Router();
const User = require("../models/User.js");
const Course = require("../models/Course.js");
const courseController = require("../controllers/courseController.js")
const auth = require("../auth.js")

router.post("/create", auth.verify, (req, res) => {
	const data = {
		course: req.body,
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	courseController.addCourse(data).then(resultFromController => {
		res.send(resultFromController)
	})
})

module.exports = router