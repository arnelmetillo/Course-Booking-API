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

module.exports.getAllCourses = () => {
	return Course.find({}).then(result => {
		return result
	})
}

module.exports.getActiveCourses = () => {
	return Course.find({isActive: true}).then(result => {
		return result
	})
}

module.exports.getCourse = (courseId) => {
	return Course.findById(courseId).then(result => {
		return result
	})
}

module.exports.updateCourse = (courseId, newData) => {
	return Course.findByIdAndUpdate(courseId, {
		name: newData.name,
		description: newData.description,
		price: newData.price
	})
	.then((result, error) => {
		if(error){
			return false
		}

		result.name = newData.name;
		result.description = newData.description;
		result.price = newData.price;
		return result.save().then((updatedCourse, saveErr) => {
			if(saveErr){
				return false;
			}else{
				return updatedCourse;
			}
		})
	})
}


module.exports.archiveCourse = (courseId) => {
	return Course.findByIdAndUpdate(courseId, {
		isActive: false
	})
	.then((result, error) => {
		if(error) {
			return false
		}

		result.isActive = result.isActive;
		return result.save().then((archivedCourse, saveErr) => {
			if(saveErr) {
				return false;
			}else {
				return archivedCourse;
			}
		})
	})
}

// return "true" if no error
/*module.exports.updateCourse = (courseId, newData) => {
	return Course.findByIdAndUpdate(courseId, {
		name: newData.name,
		description: newData.description,
		price: newData.price 
	})
	.then((updatedCourse, error) => {
		if(error){
			return false
		}

		return true
	})
}

module.exports.archiveCourse = (courseId) => {
	return Course.findByIdAndUpdate(courseId, {
		isActive: false
	})
	.then((archivedCourse, error) => {
		if(error){
			return false
		} 

		return true
	})
}*/
