const Course = require("../models/Course.js");
const User = require("../models/User.js");
const auth = require("../auth.js");
const course = require("../routes/course.js");

module.exports.addCourse = (data) => {
	if(data.isAdmin) {
		let newCourse = new Course({
			name: data.course.name,
			description: data.course.description,
			price: data.course.price
		})

		return newCourse.save().then((newCourse, error) => {
			if(error) {
				return false
			}
			return true
		})
	}
	// If the user is not admin, then return this message as a promise to avoid error
	let message = Promise.resolve(`User must be an ADMIN to access this`)
	return message.then((value) => {
		return value
	})
	
}
