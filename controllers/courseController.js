const Course = require("../models/courseSchema");
const TryCatchAynsc = require('../middleware/TryCatchAysnc');
const pagelimit = require('../utils/pagelimit');


exports.createCourse = TryCatchAynsc(async (req, res , next) => {
        const {  Title, Credits,  Department } = req.body;
        if (![1, 2, 3].includes(Credits)) {
            return res.status(400).json({ error: 'Invalid credits value. Must be 1, 2, or 3.' });
        }
        const course = new Course({
          Title,
          Credits,
          Department,
        });
        await course.save();
        res.status(201).json({ message: 'Successfully Created Course', course });
});

exports.getAllCourses = TryCatchAynsc(async (req, res) => {
    let courses = await Course.find().populate('Department');
    const {page,limit,skipp} = await pagelimit(req)
    courses = await Course.find().skip(skipp).limit(limitt).populate('Department');
    if(courses.length < 1) {
      return res.status(404).json({ error: 'No more courses found' });
    }else{
    res.status(200).json({message:"Successfully retrived all Courses data",courses, coursesCount: courses.length});
  } 

});

exports.getCourseById = TryCatchAynsc(async (req, res) => {
  const id = req.params.id;
    const course = await Course.findById(id).populate('Department');
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json({message:"Successfully retrived Course data",course});
 
});

exports.updateCourseById = TryCatchAynsc(async (req, res) => {
  const id = req.params.id;
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json({mesasge:"Successfully updated Course data",updatedCourse});
});

exports.deleteCourseById = TryCatchAynsc(async (req, res) => {
  const id = req.params.id;
  const {harddelete} = req.body;
    if (!harddelete) {
      const course = await Course.findByIdAndUpdate(id,
        { delete: true },
      {new: true}
      );
      res.status(200).json({ message: "Course deleted softly successfully" });
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      } 
    }
    else {
      const course = await Course.findByIdAndDelete(id);
      if (!course) {
      res.status(404).json({message: "Course not found" });
      }
      res.status(200).json({ message: "Course deleted hardly successfully" });

    }
});
