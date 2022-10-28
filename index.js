const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

mongoose.connect("mongodb+srv://admin:admin123@zuitt.inau6u6.mongodb.net/Course-Booking?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Prompts message in the terminal once connection is open
mongoose.connection.once("open", () => console.log("Now connected to MongoDB Atlas"))

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// process environment or port
// process environment is for live hosting / website
app.listen(process.env.PORT || 4000, () => {
	console.log(`API is now online on port ${process.env.PORT || 4000}`);
})