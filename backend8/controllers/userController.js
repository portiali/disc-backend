const supabase = require("../src/config/supabase");

// Create instance before exporting
const userController = new (class UserController {

    async postImage(req, res) {
        const { title, filename, userId } = req.body;
        const { data, error } = await supabase
            .from('user_posts')
            .insert([
                {
                    auth_id: userId,
                    title: title,
                    filename: filename  // store filename or relative path
                }
            ]);
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.status(200).json({ message: 'Image metadata added successfully', data });
    }

    async checkLiked(req, res) {
        const { userId } = req.query; // Get the userId from the query parameters
        const { img_id } = req.params; // Get the imageId from the URL parameters

        const { data, error } = await supabase
            .from('likes')
            .select('*')
            .eq('auth_id', userId)
            .eq('img_id', img_id);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(200).json({ liked: data && data.length > 0 });
    }

    async likeImage(req, res) {
        const { userId, imageId } = req.body;

        // Check if the user has already liked the image
        const { data, error } = await supabase
            .from('likes')
            .select('*')
            .eq('auth_id', userId)
            .eq('img_id', imageId);

        if (data && data.length > 0) {
            // User has already liked this image, so remove the like
            const { error: deleteError } = await supabase
                .from('likes')
                .delete()
                .eq('auth_id', userId)
                .eq('img_id', imageId);

            if (deleteError) {
                return res.status(400).json({ error: deleteError.message });
            }
            return res.json({ liked: false }); // Return the new like status
        } else {
            // User has not liked this image, so add the like
            const { error: insertError } = await supabase
                .from('likes')
                .insert([{ auth_id: userId, img_id: imageId }]);

            if (insertError) {
                return res.status(400).json({ error: insertError.message });
            }
            return res.json({ liked: true }); // Return the new like status
        }
    }

    async getImages(req, res) {
        try {
            const { data, error } = await supabase
                .from('user_posts')
                .select('*');

            if (error) throw error;
            console.log("Images fetched: ", data);
            res.json(data);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateUser(req, res) {
        try {

            const auth_id = req.params.id
            console.log("PARAMS", req.params);
            console.log("BODY", req.body);
            const { first_name, email, bio, profile_picture} = req.body;
            // Check if the user exists
            const { data: existingUser, error: checkError } = await supabase
                .from('users')
                .select('*')
                .eq('auth_id', auth_id)
                .single();

            console.log("EXIST USER", existingUser);
            if (!existingUser) {
                return res.status(404).json({ error: "User does not exist" });
            }

            if (checkError) throw checkError;

            const { data: updatedUser, error: updateError } = await supabase
                .from('users')
                .update({ first_name, email })
                .eq('auth_id', auth_id)
                .select();

            console.log("UPDATED USER", updatedUser);

            if (updateError) throw updateError;

            const { data: updatedProfile, error: updateProfileError } = await supabase
                .from('user_profiles')
                .update({ bio, profile_picture })
                .eq('auth_id', auth_id)
                .select();

            console.log("UPDATE PROFILE", updatedProfile);

            if (updateProfileError) throw updateProfileError;

            console.log("User updated:", updatedUser);
            res.status(200).json({
                message: "User updated successfully!",
                updatedUser,
                updatedProfile
            });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async createNew(req, res) {
        try {
            const { auth_id, first_name, email } = req.body;
            const { data, error } = await supabase
                .from('users')
                .insert([{ auth_id, first_name, email }])
                .select()
            if (error) throw error;
            console.log("User created:", data);
            res.json(data);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAllUsers(req, res) {
        try {
            const { data, error } = await supabase
                .from('users')
                .select(`
                *,
                user_profiles(*)
                `)

            if (error) throw error;
            console.log("Fetched users with profiles:", data);
            res.json(data);
        } catch (error) {
            res.status(400).json({ error });
        }
    }

    async getUserByID(req, res) {
        try {
            // console.log("THIS IS REQ PARAMS", req.params);
            // console.log("THIS IS THE PARAM ID", req.params.id);
            const userId = req.params.id;
            // console.log("THIS IS THE USERID", userId);
            const { data, error } = await supabase
                .from('users')
                .select(`
                *,
                user_profiles(*)
                `)
                .eq('auth_id', userId)
                .single();

            if (error) throw error;
            console.log("Fetched user with id:", data);
            res.json(data);
        } catch (error) {
            res.status(400).json({ error });
        }
    }

    async editProfile(req, res) {
        try {
            const { first_name, bio, profile_picture } = req.body;
            const { data: userData, error: userError } = await supabase
                .from('user_profiles')
                .insert([{ first_name }])
                .select()

            if (userError) throw userError;
            const { data: profileData, error: profileError } = await supabase
                .from('user_profiles')
                .insert([{ bio, profile_picture }])
                .select()

            if (profileError) throw error;
            console.log("User profile created:", data);
            res.json({
                user: userData,
                profile: profileData,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }





})();

// Add debug logging
console.log("Available controller methods:", Object.keys(userController));

// Export the controller instance
module.exports = userController;