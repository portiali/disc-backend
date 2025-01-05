const express = require("express");
const app = express();
const cors = require("cors");


const corsOptions = {
    origin: "http://localhost:3000", 
    credentials: true,              
};

app.use(cors(corsOptions));

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");



app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
});


module.exports = app;