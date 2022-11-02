const express = require("express");
const mongoose = require("mongoose");
// Cors - used to communicate si front-end, which is si Postman, to our back-end
const cors = require("cors");
const userRoutes = require("./routes/user.js");
const courseRoutes = require("./routes/course.js");

const app = express();

// Database Connection
// Automatic creation of Database na ang name is Course-Booking
mongoose.connect("mongodb+srv://admin:admin123@zuitt.inau6u6.mongodb.net/Course-Booking-API?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Prompts message in the terminal once connection is open
mongoose.connection.once("open", () => console.log("Now connected to MongoDB Atlas"))

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Initializing the routes
app.use("/users", userRoutes);
app.use("/courses", courseRoutes);

// process environment or port
// process environment is for live hosting / website
app.listen(process.env.PORT || 4000, () => {
	console.log(`API is now online on port ${process.env.PORT || 4000}`);
})