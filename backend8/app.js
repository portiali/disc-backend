const express = require("express");
const app = express();
const cors = require("cors");


const corsOptions = {
    origin: "http://localhost:3000", // allow requests from your frontend domain- change later when deployed on vercel!!
    credentials: true,              // allow cookies/credentials to be sent
};

app.use(cors(corsOptions));

// const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./api/auth");
const userRoutes = require("./api/user");


// const upload = multer();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
});


module.exports = app;