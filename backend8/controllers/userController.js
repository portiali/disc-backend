const supabase = require("../src/config/supabase");

// Create instance before exporting
const userController = new (class UserController {

  async getAllUsers(req,res){
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

  async editProfile(req,res){
      try {
          const { bio, profile_picture } = req.body;
          const { data, error } = await supabase
              .from('user_profiles')
              .insert([{ bio, profile_picture }])
              .select()

          if (error) throw error;
          console.log("User profile created:", data);
          res.json(data);
      } catch (error) {
          res.status(400).json({ error: error.message });
      }
  }





})();

// Add debug logging
console.log("Available controller methods:", Object.keys(userController));

// Export the controller instance
module.exports = userController;