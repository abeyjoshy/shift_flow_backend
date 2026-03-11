import mongoose from 'mongoose';

const shiftSchema = new mongoose.Schema({
    shift_id: { type: String, unique: true, required: true },
    store_id: { type: String, required: true },

    shift_date: { type: Date, required: true },
    start_time: { type: String, required: true },
    end_time: { type: String, required: true },

    week_number: { type: Number },

    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled'],
        default: 'scheduled'
    }
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const shiftModel = mongoose.model('Shift', shiftSchema, 'shift_model');

export default shiftModel;