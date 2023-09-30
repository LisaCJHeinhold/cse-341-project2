const { Schema, model, Types } = require('mongoose');

const departmentSchema = new Schema(
    {
        departmentName: {
            type: String,
            required: 'Please enter the department name'
        },
        budget: {
            type: Number,
            required: 'Please enter the department budget'
        },
        location: {
            type: String,
            required: 'Please enter the department location'
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }    
);

const Department = model('department', departmentSchema);

module.exports = Department;