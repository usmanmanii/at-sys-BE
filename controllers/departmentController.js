const Department = require("../models/departmentSchema"); 
const TryCatchAynsc = require('../middleware/TryCatchAysnc');
const pagelimit = require('../utils/pagelimit');


exports.createDepartment = TryCatchAynsc(async (req, res) => {
    const department = new Department(req.body);
    await department.save();
    res.status(201).json({message:"Successfully Created Department",department});
  
});

  exports.getAllDepartments = TryCatchAynsc( async (req, res) => {
    const departments = await Department.find().populate('University');
    const {page,limit,skipp} = await pagelimit(req)
    departments = await Department.find().skip(skipp).limit(limit).populate('University');
    res.status(200).json({message:"Successfully retrieved all departments",departments , departmentsCount: departments.length});
});

exports.getDepartmentById = TryCatchAynsc(async (req, res) => {
  const id = req.params.id;
  
    const department = await Department.findById(id).populate('University');
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.status(200).json({message :"Successfully retrieved department",department});
 
});

exports.updateDepartmentById = TryCatchAynsc(async (req, res) => {
  const id = req.params.id;
 
    const updatedDepartment = await Department.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedDepartment) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.status(200).json({mesage:"Successfully updated department",updatedDepartment});
 
});

exports.deleteDepartmentById = TryCatchAynsc(async (req, res) => {
  const id = req.params.id;
   const {harddelete} = req.body;
 
    if (!harddelete) {
      const department = await Department.findByIdAndUpdate(id,
        { delete: true },
        { new: true }
      );
      res.status(200).json({ message: "department deleted softly successfully" });
      if (!department) {
        return res.status(404).json({ error: "department not found" });
      }
    }
    else {
      const course = await Department.findByIdAndDelete(id);
      if (!course) {
        res.status(404).json({ message: "department not found" });
      }
      res.status(200).json({ message: "department deleted hardly successfully" });

    }
  
});
