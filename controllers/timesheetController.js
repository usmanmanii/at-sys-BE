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
      return { error: 'Student not found' };
    }
      const timesheet = [];
      const rooms = await Room.find({});
      const courses = await Course.find({});
      const instructors = await Instructor.find({});
      const timeSlots = await TimeSlot.find({});
  
      async function isRoomAvailableForTimeSlot(room, timeSlot) {
        const existingClasses = await TimeSheet.find({ Room: room._id, timeSlot });
        return existingClasses.length === 0;
      }
  
      for (const timeSlot of timeSlots) {
        for (const room of rooms) {
          const isRoomAvailable = await isRoomAvailableForTimeSlot(room, timeSlot);
          if (isRoomAvailable) {
            const randomCourse = getRandomItemFromArray(courses);
            const randomInstructor = getRandomItemFromArray(instructors);
  

            const timesheetEntry = new TimeSheet({
              Room: room._id,
              timeSlot: timeSlot,
              Course: randomCourse._id,
              instructor: randomInstructor._id,
            });
  
            await timesheetEntry.save();
  
            timesheet.push(timesheetEntry);
          }
        }
      }
  
      return timesheet;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  
  function getRandomItemFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}
  
