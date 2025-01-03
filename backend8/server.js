const app = require("./app");
// const multer = require("multer");

// const supabase = require("./src/config/supabase");
// const cors = require("cors");

// const upload = multer();
// app.use(cors());

// app.post("/login", upload.none(), async (req, res) => {
//     try {
//         const { first_name, email } = req.body;
//         const { data, error } = await supabase
//             .from('users')
//             .insert([{first_name,email}])
//             .select()

//         if (error) throw error;
//         console.log("User created:", data);
//         res.json(data);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });


const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});