const Instructor = require("../models/instructorSchema");


exports.createInstructor = async (req, res) => {
    try {
      const instructor = new Instructor(req.body);
      await instructor.save();
      res.status(201).json({message:"Successfully created Instructor  ",instructor});
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

  exports.getAllInstructors = async (req, res) => {
    try {
      const instructors = await Instructor.find().populate('Department');
      res.status(200).json({message:"Successfully retrived all Instructor data ",instructors});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  exports.getInstructorById = async (req, res) => {
    const id = req.params.id;
    try {
      const instructor = await Instructor.findById(id).populate('Department');
      if (!instructor) {
        return res.status(404).json({ error: "Instructor not found" });
      }
      res.status(200).json({message:"Successfully retrived Instructor data ",instructor});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.updateInstructorById = async (req, res) => {
    const id = req.params.id;
    try {
      const updatedInstructor = await Instructor.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedInstructor) {
        return res.status(404).json({ error: "Instructor not found" });
      }
      res.status(200).json({message:"Successfully updated  Instructor data",updatedInstructor});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

  exports.deleteInstructorById = async (req, res) => {
    const id = req.params.id;
    try {
      const instructor = await Instructor.findByIdAndDelete(id);
      if (!instructor) {
        return res.status(404).json({ error: "Instructor not found" });
      }
      res.status(200).json({ message: "Instructor deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };