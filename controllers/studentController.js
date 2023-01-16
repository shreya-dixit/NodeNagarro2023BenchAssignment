const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Student = mongoose.model('Student');
let alert = require('alert'); 
var flash = require('connect-flash');
flash = require('express-flash')
const { body, validationResult } = require('express-validator');


router.get('/student', (req, res) => {
    res.render("student/addOrEdit", {
        viewTitle: "Add New Result"
    });
});

router.get('/student/viewresult', (req, res) => {
    res.render("student/viewresult", {
        viewTitle: "View Result"
    });
});
router.get('/login', (req, res) => {
    res.render("login", {
        viewTitle: "Login"
    });
});

router.get('/logout', (req, res) => {
    res.render("homepage", {
        viewTitle: "Result Management System"
    });
});
router.get('/back', (req, res) => {
    res.render("homepage", {
        viewTitle: "Result Management System"
    });
});


router.get('/', (req, res) => {
        res.render("homepage", {
            viewTitle: "Result Management System"
        });
    });

router.post('/student', (req, res) => {
    var query=req.body.RollNo
    Student.find({RollNo: query }, function (err, docs) {
        if (err){
            console.log(err)
        }
        if(!(docs=='')& req.body._id == ''){
        console.log(docs)
         alert("This RollNumber Student already exists")
        }
         else{
             if (req.body._id == '')
                 insertRecord(req, res);
            else
                updateRecord(req, res);   
         }
    })
})
    
router.post('/login', (req, res) => {
    if (req.body.UName == 'Shreya' & req.body.Pwd=='1247')
    res.render("student/addOrEdit", {
        viewTitle: "Add New Result"
    });
        else
        alert("Invalid Credentials")
        res.render("login", {
           viewTitle: "Login"
         });
});

router.post('/yourresult', (req, res) => {
    var query=req.body.RollNo
    Student.find({RollNo: query }, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            if(docs=='')
              alert('RollNo is invalid')
            else{  
             console.log("Result : ", docs);
            res.render("student/yourresult", {
                viewTitle: "Result ",
                res:docs
            });}
            
        }
    }); 
})


function insertRecord(req, res) {
    var student = new Student();
    student.Name = req.body.Name.trim();
    student.RollNo = req.body.RollNo.trim();
    student.DateOfBirth = req.body.DateOfBirth.trim();
    student.Score = req.body.Score.trim();
    student.save((err, doc) => {
        if (!err)
            res.redirect('student/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("student/addOrEdit", {
                    viewTitle: "Add  Result",
                    student: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Student.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('student/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("student/addOrEdit", {
                    viewTitle: 'Update Student',
                    student: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/student/list', (req, res) => {
    Student.find((err, docs) => {
        if (!err) {
            res.render("student/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving students result list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/student/:id', (req, res) => {
    Student.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("student/addOrEdit", {
                viewTitle: "Update Student Result",
                student: doc
            });
        }
    });
});

router.get('/student/delete/:id', (req, res) => {
    Student.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/student/list');
        }
        else { console.log('Error in student delete :' + err); }
    });
});




module.exports = router;