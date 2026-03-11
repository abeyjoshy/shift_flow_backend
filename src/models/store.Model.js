import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const storeSchema = new mongoose.Schema({
    store_name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    is_active: { type: Boolean, default: true }
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});


/*
Hash the password before saving the store model
*/
storeSchema.pre('save', async function (next) {

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
storeSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


const storeModel = mongoose.model('Store', storeSchema, 'store_data');

export default storeModel;