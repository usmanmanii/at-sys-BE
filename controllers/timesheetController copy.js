const TimeSheet = require('../models/timesheetSchema');
const Room = require('../models/roomSchema');
const TimeSlot = require('../models/timeSlotSchema');
const Course = require('../models/courseSchema');
const Instructor = require('../models/instructorSchema');
const Student = require('../models/studentSchema');

exports.generateTimeSheet = async (studentId) => {
  try {
    const student = await Student.findById(studentId).exec();
 if (!student) {
  console.error('Could not find student');
    }
 else {
      const timesheet = [];
      const holidays = ['Saturday', 'Sunday'];
      const teachers = await findteacher();
      const courses = await findcourse();
      const rooms = await findroom();
      const timeSlots = await findtimeslot();

   
   
   
   
   
   
   
   
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};






async function findteacher() {
  try {
    const teacherid = await Instructor.find().exec();
    return teacherid;
  } catch (err) {
    console.error('Error finding teachers:', err);
    throw err;
  }
}

async function findcourse() {
  try {
    const courseid = await Course.find().exec();
    return courseid;
  } catch (err) {
    console.error('Error finding courses:', err);
    throw err;
  }
}

async function findroom() {
  try {
    const roomid = await Room.find().exec();
    return roomid;
  } catch (err) {
    console.error('Error finding rooms:', err);
    throw err;
  }
}

async function findtimeslot() {
  try {
    const timeid = await TimeSlot.find().exec();
    return timeid;
  } catch (err) {
    console.error('Error finding time slots:', err);
    throw err;
  }
}