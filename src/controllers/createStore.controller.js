import Store from "../models/store.Model.js";

export default async function createStore(req, res) {

    const store_name = req.body?.store_name || null;
    const password = req.body?.password || null;
    const email = req.body?.email || null;
    const is_active = req.body?.is_active || null;

    if(store_name!= null && password != null && email != null && is_active != null){
        try {
            // Check if the username/email is already taken
            const existingEmail = await Store.findOne({ email: email.toLowerCase()});
            if (existingEmail) {               
                return res.status(400).json({status: 'SUCCESS', message: 'Email is already taken' });
            }
    
            // Check if the username/email is already taken
            const existingUser = await Store.findOne({store_name: store_name.toLowerCase()});
            if (existingUser) {               
                return res.status(400).json({status: 'SUCCESS', message: 'Store Name is already taken' });
            }

            // Create a new user instance
            const newUser = new Store({ store_name, password, email, is_active });
    
            // Save the new user to the database
            await newUser.save();
            
            res.status(201).json({ status: 'SUCCESS', message: 'Store registered successfully' });
        } catch (error) {
             // Handle any errors that occur while fetching the data
             console.error(`Error creating ELS user: ${error}`);
             res.status(500).json({ status: 'ERROR', message: 'Error creating store', error: error.message });
    
        }
    }
    else{
        console.log("BAD_REQUEST: storename, password, email, is_active are required!");
        
        res.status(400).send({ status: 'BAD_REQUEST', message: "storename, password, email, is_active are required!" });

    }

    

}