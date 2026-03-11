import User from "../models/user.Model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

export default async function generateAuthToken(req, res) {

    const username = req.body?.username || null;
    const password = req.body?.password || null;

    if(username!= null && password != null){
        try{
            // Find user in the database
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(200).json({ status: "FAILED", message: 'Invalid username or password' });
            }

             // Compare password with hashed password in the database
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(200).json({ status: "FAILED", message: 'Invalid username or password' });
            }


            // Generate a JWT token
            const token = jwt.sign(
                { id: user._id, username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );


            // Send token to the client
            res.status(200).json({ status: 'SUCCESS', message: "Successfully generated token", payLoad: {token: token}});

        }
        catch (error) {
            // Handle any errors that occur while fetching the data
            console.error(`Error in user authentication: ${error}`);
            res.status(500).json({ status: 'ERROR', message: 'Error in user authentication', error: error.message });
   
       }

    }

    else{
        console.log("BAD_REQUEST: username, password are required!");
        
        res.status(400).send({ status: 'BAD_REQUEST', message: "username, password are required!" });

    }
}