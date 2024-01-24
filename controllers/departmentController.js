const Department = require("../models/departmentSchema"); 

exports.createDepartment = async (req, res) => {
  try {
    const department = new Department(req.body);
    await department.save();
    res.status(201).json({message:"Successfully Created Department",department});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find().populate('University');
    res.status(200).json({message:"Successfully retrieved all departments",departments});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDepartmentById = async (req, res) => {
  const id = req.params.id;
  try {
    const department = await Department.findById(id).populate('University');
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.status(200).json({message :"Successfully retrieved department",department});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDepartmentById = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedDepartment = await Department.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedDepartment) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.status(200).json({mesage:"Successfully updated department",updatedDepartment});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteDepartmentById = async (req, res) => {
  const id = req.params.id;
   const {harddelete} = req.body;
  try {
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
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
