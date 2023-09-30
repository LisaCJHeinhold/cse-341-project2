const moment = require('moment');
const { Schema, model } = require('mongoose');

const employeeSchema = new Schema(
    {
        firstName: {
            type: String,
            required: 'Please enter employee first name',
            trim: true
        },
        lastName: {
            type: String,
            required: 'Please enter employee last name',
            trim: true
        },
        position: {
            type: String,
            required: 'Please enter employee position'
        },
        salary: {
            type: Number,
            required: 'Please enter employee salary'
        },
        hireDate: {
            type: Date,
            get: createdAtVal => moment(createdAtVal).format('MMM/D/YYYY'),
            required: 'Please enter employee hire date'
        },
        departmentId: {
            type: Schema.Types.ObjectId,
            ref: 'department'
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

const Employee = model('employee', employeeSchema);

module.exports = Employee;
