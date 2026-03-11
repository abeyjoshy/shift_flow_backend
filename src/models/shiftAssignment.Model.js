import mongoose from 'mongoose';

const shiftAssignmentSchema = new mongoose.Schema({
    assignment_id: { type: String, unique: true, required: true },

    shift_id: { type: String, required: true },
    user_id: { type: String, required: true },

    status: {
        type: String,
        enum: ['assigned', 'pending', 'declined'],
        default: 'assigned'
    }
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const shiftAssignmentModel = mongoose.model(
    'ShiftAssignment',
    shiftAssignmentSchema,
    'shift_assignment_data'
);

export default shiftAssignmentModel;