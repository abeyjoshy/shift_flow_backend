import User from "../models/user.Model.js";

export default async function createUser(req, res) 

{
    const store_id = req.body?.store_id || null;
    const name = req.body?.name || null;
    const email = req.body?.email || null;
    const username = req.body?.username || null;
    const password = req.body?.password || null;
    const role = req.body?.role || "employee";
    const availability = req.body?.availability || [];

    if (store_id && name && email && username && password) {

        try {

            // Check if email already exists
            const existingEmail = await User.findOne({ email: email.toLowerCase() });
            if (existingEmail) {
                return res.status(400).json({
                    status: "FAIL",
                    message: "Email already exists"
                });
            }

            // Check if username already exists
            const existingUsername = await User.findOne({ username: username.toLowerCase() });
            if (existingUsername) {
                return res.status(400).json({
                    status: "FAIL",
                    message: "Username already exists"
                });
            }

            // Create new user
            const newUser = new User({
                store_id,
                name,
                email: email.toLowerCase(),
                username: username.toLowerCase(),
                password,
                role,
                availability
            });

            await newUser.save();

            res.status(201).json({
                status: "SUCCESS",
                message: "User created successfully",
                data: newUser
            });

        } catch (error) {

            console.error(`Error creating user: ${error}`);

            res.status(500).json({
                status: "ERROR",
                message: "Error creating user",
                error: error.message
            });
        }

    } else {

        res.status(400).json({
            status: "BAD_REQUEST",
            message: "store_id, name, email, username and password are required"
        });
    }
}
