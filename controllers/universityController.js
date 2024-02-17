const University = require("../models/universitySchema");
const TryCatchAynsc = require('../middleware/TryCatchAysnc');
const pagelimit = require('../utils/pagelimit');

exports.createUniversity = TryCatchAynsc(async (req, res) => {
  
    const university = new University(req.body);
    await university.save();
    res.status(201).json({message:"Successfully Created University",university});
  
});
 
exports.getdata = TryCatchAynsc(async (req, res) => {

    const universities = await University.find()
    const {page,limit,skip} = await pagelimit(req)
    res.status(200).json({message:"Successfully retrived all data",universities});
 
});

exports.getUniversitybyId = TryCatchAynsc(async (req, res) => {
  const id = req.params.id;
  console.log(id);
  
    const university = await University.findById(id);
    if (!university) {
      return res.status(404).json({ error: "University not found" });
    }
    res.status(200).json({message:"Succefully retrived data",university});
  
});


exports.updatedata = TryCatchAynsc(async (req, res) => {
  const id = req.params.id;

    const updateunibyid = await University.findByIdAndUpdate(
      id, 
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updateunibyid) {
      return res.status(404).json({ error: "University not found" });
    }
    res.status(200).json({ message: "University updated successfully",updateunibyid });
 
});




exports.deleteUniversityById = TryCatchAynsc(async (req, res) => {
  const id = req.params.id;
  const {harddelete} = req.body;
 
   if (!harddelete) {
      const university = await University.findByIdAndUpdate(id,
        { delete: true },
        { new: true }
      );
      res.status(200).json({ message: "University deleted softly successfully",  });
      if (!university) {
        return res.status(404).json({ error: "University not found" });
      }
    }
    else {
      const university = await University.findByIdAndDelete(id);
      if (!university) {
        res.status(404).json({ message: "University not found" });
      }
      res.status(200).json({ message: "University deleted hardly successfully" });

    }
 
});
