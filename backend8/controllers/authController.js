const supabase = require("../src/config/supabase");
const userController = require("./userController");

class AuthController {
    async signUp(req, res) {
        try {
            const { email, password } = req.body;

            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (authError) throw authError;

            //users
            const newUser = {
                auth_id: authData.user.id,
                first_name: "newUser",
                email: email
            }
            const { data: dbData, error: dbError } = await supabase
                .from("users")
                .insert(newUser)
                .select();

            if (dbError) throw dbError;

            //user_profiles
            const newUserProfile = {
                auth_id: authData.user.id,
                bio: "no bio",
                profile_picture: "no profile picture"
            }

            const { data: dbProfile, error: dbProfileError } = await supabase
                .from("user_profiles")
                .insert(newUserProfile)
                .select();

            if (dbProfileError) throw dbProfileError;

            res.json({
                message: "Signup successful!",
                user: authData.user,
                dbUser: dbData,
                dbProfile: dbProfile,
                // dbPosts: dbPosts
            });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async signIn(req, res) {
        try {
            const { email, password } = req.body;

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            res.json({
                message: "Login successful",
                session: data.session,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getProtectedData(req, res) {
        res.json({
            message: "This is protected data!",
            user: req.user,
        });
    }
}

module.exports = new AuthController();