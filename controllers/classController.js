const Class = require('../models/classSchema');
const TryCatchAynsc = require('../middleware/TryCatchAysnc');
const pagelimits = require('../utils/pagelimit');
const mongoose = require('mongoose');

exports.createClass = TryCatchAynsc(async (req, res ,next) => {
    const newClass = new Class({
// _id:new mongoose.Types.ObjectId('65d60bb08db18e203d52d018'),
    ...req.body,
    });
    await newClass.save();
    res.status(201).json({message:"Successfully Created New Class ",newClass});
    // res.status(500).json({ message: err.message });
  //  return next(new errorhandler(err.message , 400));
  });


exports.getAllClasses = TryCatchAynsc( async (req, res) => {
 
  let classes = await Class.find().populate(['Course','Instructor','Room','TimeSlot']);

   const {page,limit,skip} = await pagelimits(req)

    classes = await Class.find().skip(skip).limit(limit).populate(['Course','Instructor','Room','TimeSlot']);
if(classes.length<1)
{
  return res.status(404).json({ error: 'No more classes found' });
}else{
    res.status(200).json({message:"Successfully Retrived all CLasses ",classes , classesCount: classes.length});
}
 
});


exports.getClassById = TryCatchAynsc( async (req, res) => {
  const id = req.params.id;
    const classInstance = await Class.findById(id).populate(['Course','Instructor','Room','TimeSlot']);
    if (!classInstance) {
      return res.status(404).json({ error: "Class not found" });
    }
    res.status(200).json({message:"Successfully Retrived Class ",classInstance});
  });


exports.updateClassById = TryCatchAynsc( async (req, res) => {
  const id = req.params.id;
    const updatedClass = await Class.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedClass) {
      return res.status(404).json({ error: "Class not found" });
    }
    res.status(200).json({message:"Successfully Updated  Class ",updatedClass});
  });


exports.deleteClassById = TryCatchAynsc( async (req, res) => {
  const id = req.params.id;
  const {harddelete} = req.body;
    if (harddelete) {
    const deleted = await Class.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({message:"class not found"});
      }
    res.status(200).json({ message: "Class deleted hardly successfully" });

    }else{
    const classInstance = await Class.findByIdAndUpdate(id,
      {delete: true},
{new:true}
      );
    if (!classInstance) {
      return res.status(404).json({ error: "Class not found" });
    }
    res.status(200).json({ message: "Class deleted softly successfully" });
  } 
});
