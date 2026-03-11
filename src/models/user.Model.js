import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/*
Availability Subdocument Schema
*/
const availabilitySchema = new mongoose.Schema({
    day_of_week: {
        type: Number,
        required: true,
        min: 0,
        max: 6
    },
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    }
}, { _id: false });

/*
User Schema
*/
const userSchema = new mongoose.Schema({
    store_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['admin', 'manager', 'employee'],
        default: 'employee'
    },
    is_active: {
        type: Boolean,
        default: true
    },

    /*
    Embedded Availability
    */
    availability: [availabilitySchema],

    created_at: {
        type: Date,
        default: Date.now
    }
});

/*
Hash the password before saving the user model
*/
userSchema.pre('save', async function (next) {

    // Only hash the password if modified
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

/*
Compare entered password with stored hash
*/
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema, 'user_data');

export default User;




// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true,
//         minlength: 3
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: 6
//     }
// });

// // Hash the password before saving the user model
// userSchema.pre('save', async function (next) {
//     // Only hash the password if it has been modified or is new
//     if (!this.isModified('password')) {
//         return next();
//     }

//     // Generate a salt
//     const salt = await bcrypt.genSalt(10);
//     // Hash the password with the salt
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// // Method to compare entered password with stored hash
// userSchema.methods.comparePassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

// const User = mongoose.model('User', userSchema, 'els_users');

// export default User;
