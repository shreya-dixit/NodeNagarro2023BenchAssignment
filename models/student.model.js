const mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
    RollNo: {
        type: String,
        required: 'This field is required.'
    },
    Name: {
        type: String,
        required: 'This field is required.'
    },
    DateOfBirth: {
        type: String,
        required: 'This field is required.'
    },
    Score: {
        type: String,
        required: 'This field is required.'
    }
});

// Custom validation for email
// employeeSchema.path('email').validate((val) => {
//     emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return emailRegex.test(val);
// }, 'Invalid e-mail.');

mongoose.model('Student', studentSchema);