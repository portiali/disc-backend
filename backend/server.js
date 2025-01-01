import express from "express";
import cors from "cors";
// import { Pool } from "pg"
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from "dotenv";
// import { User } from "./types/user";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

app.get("/users", async (req, res) => {
    // res.json({ message: "Hello, world!" });
    try {
        const result = await pool.query("SELECT * FROM users");
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Users not found" });
        }
        res.json(result.rows);
    } catch (err) {
        console.error("Query error:", err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
    
});

// app.post(
//     "/api/execute-sql",
//     async (req, res) => {
//         const { query } = req.body;

//         try {
//             const result = await pool.query(query);
//             res.json(result.rows);
//         } catch (err) {
//             console.error("Query error:", err);
//             res.status(500).json({
//                 error: err instanceof Error ? err.message : "Query failed",
//             });
//         }
//     }
// );

// app.get(
//     "/api/users/:id",
//     async (req, res) => {
//         try {
//             const result = await pool.query (
//                 "SELECT * FROM users WHERE id = $1",
//                 [req.params.id]
//             );
//             if (result.rows.length === 0) {
//                 return res.status(404).json({ error: "User not found" });
//             }
//             res.json(result.rows[0]);
//         } catch (err) {
//             console.error("Query error:", err);
//             res.status(500).json({ error: "Failed to fetch user" });
//         }
//     }
// );

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;