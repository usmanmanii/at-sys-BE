const Student = require("../models/studentSchema"); 
const TryCatchAynsc = require('../middleware/TryCatchAysnc');
const pagelimit = require('../utils/pagelimit');

exports.createStudent = TryCatchAynsc(async (req, res) => {
  
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({message: "Successfully Created Student",student});
 
});

exports.getAllStudents = TryCatchAynsc(async (req, res) => {
  

    const students = await Student.find().populate('Department');
  const { page ,  limit , skip} = await pagelimit(req);
    students = await Student.find().skip(skip).limit(limit).populate('Department');
    res.status(200).json({message:"Successfully retrived all Students",students ,  studentsCount : students.length});
  
});


exports.getStudentById = TryCatchAynsc(async (req, res) => {
  const id = req.params.id;
 
    const student = await Student.findById(id).populate('Department');
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json({message:"Successfully retrived  Student",student});
  
});


exports.updateStudentById = TryCatchAynsc(async (req, res) => {
  const id = req.params.id;
  
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json({message:"Successfully Updated Student",updatedStudent});
 
});


exports.deleteStudentById = TryCatchAynsc(async (req, res) => {
  const id = req.params.id;
  const {harddelete} = req.body;
 
    if (!harddelete) {
      const student = await Student.findByIdAndUpdate(id,
        { delete: true },
        { new: true }
      );
      res.status(200).json({ message: "Student deleted softly successfully" });
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }
    }
    else {
      const  student= await Student.findByIdAndDelete(id);
      if (!student) {
        res.status(404).json({ message: "Student not found" });
      }
      res.status(200).json({ message: "Student deleted hardly successfully" });

    }
  });
