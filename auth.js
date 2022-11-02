const jwt = require("jsonwebtoken");
const secret = "CourseBookingAPI";

// To create a token using the jsonwebtoken package from NPM
module.exports.createAccessToken =  (user) => {
	const data = {
		id : user._id,
		email: user.email,
		isAdmin: user.isAdmin
	}

	return jwt.sign(data, secret, {});
};

// To verify a token from the request/from postman
module.exports.verify = (request, response, next) => {
	let token = request.headers.authorization

	if(typeof token !== "undefined") {
		console.log(token)
		// Bearer <actual-token>
		token = token.slice(7, token.length)
		// <actual-token>
		/*
			removing the word bearer and whitespace to get the actual token only.
		*/

		// To verify the token using jwt, it requires the actual token and the secret key that was used to create it.
		return jwt.verify(token, secret, (error, data) => {
			if(error) {
				return response.send({
					auth: "Failed."
				})
			}else {
				next()
			}
		})
	}else {
		return null
	}
}

/*
	.verify()
		The verify() method of the SubtleCrypto interface verifies a digital signature.

			SYNTAX:
				verify(algorithm, key, signature, data)

			where:
			~algorithm - A string or object defining the algorithm to use, and for some algorithm choices, some extra parameters.
			~key - A Key containing the key that will be used to verify the signature. It is the secret key for a symmetric algorithm and the public key for a public-key system.
			~signature - A ArrayBuffer containing the signature to verify.
			~data - A ArrayBuffer containing the data whose signature is to be verified.

	.next()
		The next() method returns an object with two properties done and value.

			SYNTAX:
				generatorObject.next(value)
*/


// To decode the user details from the token
module.exports.decode = (token) => {
	if(typeof token !== "undefined") {
		token = token.slice(7, token.length)

		return jwt.verify(token, secret, (error,data) => {
			if(error) {
				return null
			}else {
				return jwt.decode(token, {complete: true}).payload
			}
		})
	}else {
		return null
	}
}