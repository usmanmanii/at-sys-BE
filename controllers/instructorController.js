const Instructor = require("../models/instructorSchema");
const TryCatchAynsc = require('../middleware/TryCatchAysnc');
const pagelimit = require('../utils/pagelimit');

exports.createInstructor = TryCatchAynsc( async (req, res) => {
      const instructor = new Instructor(req.body);
      await instructor.save();
      res.status(201).json({message:"Successfully created Instructor  ",instructor});
    
  });
  

  exports.getAllInstructors = TryCatchAynsc(async (req, res) => {
    
      const instructors = await Instructor.find().populate('Department');
      const {page , skip, limit } = await pagelimit(req);
      instructors = await Instructor.find().skip(skip).limit(limit).populate('Department');
      res.status(200).json({message:"Successfully retrived all Instructor data ",instructors , instructorsCount: instructors.length} );
    
  });
  

  exports.getInstructorById = TryCatchAynsc(async (req, res) => {
    const id = req.params.id;
   
      const instructor = await Instructor.findById(id).populate('Department');
      if (!instructor) {
        return res.status(404).json({ error: "Instructor not found" });
      }
      res.status(200).json({message:"Successfully retrived Instructor data ",instructor});
    
  });
  
  exports.updateInstructorById = TryCatchAynsc(async (req, res) => {
    const id = req.params.id;
   
      const updatedInstructor = await Instructor.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedInstructor) {
        return res.status(404).json({ error: "Instructor not found" });
      }
      res.status(200).json({message:"Successfully updated  Instructor data",updatedInstructor});
    
  });
  

  exports.deleteInstructorById = TryCatchAynsc(async (req, res) => {
    const id = req.params.id;
    const {harddelete } =req.body;
   
       if (!harddelete) {
      const instructor = await Instructor.findByIdAndUpdate(id,
        { delete: true },
        { new: true }
      );
      res.status(200).json({ message: "Instructor deleted softly successfully" });
      if (!instructor) {
        return res.status(404).json({ error: "Instructor not found" });
      }
    }
    else {
      const instructor = await Instructor.findByIdAndDelete(id);
      if (!instructor) {
        res.status(404).json({ message: "Instructor not found" });
      }
      res.status(200).json({ message: "Instructor deleted hardly successfully" });

    }
   
  });