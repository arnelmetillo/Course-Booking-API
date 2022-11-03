const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const auth = require("../auth.js");
const Course = require("../models/Course.js");

module.exports.checkEmailExists = (reqBody) => {
	return User.find({email: reqBody.email}).then(result => {
		if(result.length > 0) {
			return true;
		}else{
			return false
		}
	})
}

module.exports.registerUser = (reqBody) => {
	let newUser = new User({
		firstName : reqBody.firstName,
		lastName : reqBody.lastName,
		email: reqBody.email,
		mobileNo: reqBody.mobileNo,
		password: bcrypt.hashSync(reqBody.password, 10)
		// 10 means salt
		// 10 is okay for security and mabilis lang. 
	})

	return newUser.save().then((user, error) => {
		if(error) {
			return false;
		}else {
			return true;
		}
	})
}

module.exports.loginUser = (reqBody) => {
	return User.findOne({email: reqBody.email}).then(result => {
		if(result == null){
			return false;
		}else{
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password)

			if(isPasswordCorrect){
				// Generate an access
				return {access: auth.createAccessToken(result)}
			}
		}
	})
}

/*
	S38 Activity - Code Along
*/
module.exports.getProfile = (data) => {
	return User.findById(data.userId).then(result => {
		return result;
	})
}

// Activity end


// Adding courseId in Enrollments array & userId in enrollees array
module.exports.enroll = async (data) => {
	if (data.isAdmin) {
		return `You are not allowed to enroll to any courses!`
	} else {
	// Adds the courseId in the user's enrollment array
	let isUserUpdated = await User.findById(data.userId).then(user => {
		user.enrollments.push({courseId : data.courseId});

		return user.save().then((user, error) => {
			if(error) {
				return false;
			}else {
				return true;
			}
		})
	})

	let isCourseUpdated = await Course.findById(data.courseId).then(course => {
		course.enrollees.push({userId: data.userId});

		return course.save().then((course, error) => {
			if(error){
				return false
			}else{
				return true;
			}
		})
	})

	if(isUserUpdated && isCourseUpdated){
		/*
			isUserUpdated = true
			isCourseUpdated = true
			FINAL OUTPUT = TRUE
		*/
		return true;
	}else{
		/*
			if one of these: isUserUpdated or isCourseUpdated is false, the output will be FALSE

			if both isUserUpdated and isCourseUpdated are false, the output will be FALSE
		*/
		return false;
	}
	}
}

// Sir Al. O's method of restricting admin to enroll to any courses

// Adding courseId in Enrollments array & userId in enrollees array
/*module.exports.enroll = async (data) => {
	// Adds the courseId in the user's enrollment array
	if (!data.isAdmin) {
	let isUserUpdated = await User.findById(data.userId).then(user => {
		user.enrollments.push({courseId : data.courseId});

		return user.save().then((user, error) => {
			if(error) {
				return false;
			}else {
				return true;
			}
		})
	})

	let isCourseUpdated = await Course.findById(data.courseId).then(course => {
		course.enrollees.push({userId: data.userId});

		return course.save().then((course, error) => {
			if(error){
				return false
			}else{
				return true;
			}
		})
	})

	if(isUserUpdated && isCourseUpdated){
		//isUserUpdated = true
		//isCourseUpdated = true
		//FINAL OUTPUT = TRUE
		return true;
	}else{
		//if one of these: isUserUpdated or isCourseUpdated is false, the output will be FALSE
		//if both isUserUpdated and isCourseUpdated are false, the output will be FALSE
		return false;
	}
	}else {
		// return `This feature is not available for Admin role!`
		let message = Promise.resolve("This feature is not available for Admin role! ")
			return message;
	}
}*/