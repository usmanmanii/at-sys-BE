const Student = require("../models/studentSchema"); 

exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({message: "Successfully Created Student",student});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('Department');
    res.status(200).json({message:"Successfully retrived all Students",students});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getStudentById = async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Student.findById(id).populate('Department');
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json({message:"Successfully retrived  Student",student});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateStudentById = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json({message:"Successfully Updated Student",updatedStudent});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deleteStudentById = async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
