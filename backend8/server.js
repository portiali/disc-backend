const app = require("./app");
// // const multer = require("multer");

// // const supabase = require("./src/config/supabase");
// // const cors = require("cors");

// // const upload = multer();
// // app.use(cors());


const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});