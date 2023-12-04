const Class = require('../models/classSchema');

exports.createClass = async (req, res) => {
  try {
    const newClass = new Class(req.body);
    await newClass.save();
    res.status(201).json({message:"Successfully Created New Class ",newClass});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate(['Course','Instructor','Room','TimeSlot']);
    res.status(200).json({message:"Successfully Retrived all CLasses ",classes});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getClassById = async (req, res) => {
  const id = req.params.id;
  try {
    const classInstance = await Class.findById(id).populate(['Course','Instructor','Room','TimeSlot']);
    if (!classInstance) {
      return res.status(404).json({ error: "Class not found" });
    }
    res.status(200).json({message:"Successfully Retrived Class ",classInstance});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateClassById = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedClass = await Class.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedClass) {
      return res.status(404).json({ error: "Class not found" });
    }
    res.status(200).json({message:"Successfully Updated  Class ",updatedClass});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deleteClassById = async (req, res) => {
  const id = req.params.id;
  try {
    const classInstance = await Class.findByIdAndDelete(id);
    if (!classInstance) {
      return res.status(404).json({ error: "Class not found" });
    }
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
