const TimeSheet = require('../models/timesheetSchema');
const Room = require('../models/roomSchema');
const TimeSlot = require('../models/timeSlotSchema');
const Course = require('../models/courseSchema');
const Instructor = require('../models/instructorSchema');
const Student = require('../models/studentSchema');

exports.generateTimeSheet = async (studentId) => {
  try {
    const students = await Student.find({ _id: studentId }).exec();

    if (students.length === 0) {
      return { error: 'Student not found' };
    }

    const timesheet = [];
    const rooms = await Room.find({});
    const courses = await Course.find({});
    const instructors = await Instructor.find({});
    const timeSlots = await TimeSlot.find({});

    console.log('Rooms:', rooms);
    console.log('Courses:', courses);
    console.log('Instructors:', instructors);
    console.log('TimeSlots:', timeSlots);

    const maxHoursPerDay = students[0].maxHoursPerDay;

    async function isRoomAvailableForTimeSlot(room, timeSlot) {
      const existingClass = await TimeSheet.findOne({ Room: room._id, timeSlot });
      return !existingClass;
    }

    async function isTeacherAvailableForTimeSlot(instructor, timeSlot) {
      const existingClass = await TimeSheet.findOne({ instructor: instructor._id, timeSlot });
      return !existingClass;
    }

    async function isStudentAvailableForTimeSlot(student, timeSlot) {
      const existingClass = await TimeSheet.findOne({ students: student._id, timeSlot });
      return !existingClass;
    }

    for (const timeSlot of timeSlots) {
      console.log('Current Time Slot:', timeSlot);

      let roomFound = false;

      for (const room of rooms) {
        const isRoomAvailable = await isRoomAvailableForTimeSlot(room, timeSlot);

        console.log(`Room: ${room.Name}, Is Available: ${isRoomAvailable}`);

        if (isRoomAvailable) {
          let instructorFound = false;

          for (const instructor of instructors) {
            const isTeacherAvailable = await isTeacherAvailableForTimeSlot(instructor, timeSlot);

            console.log(`Instructor: ${instructor.Name}, Is Available: ${isTeacherAvailable}`);

            if (isTeacherAvailable) {
              const student = students[0];
              const isStudentAvailable = await isStudentAvailableForTimeSlot(student, timeSlot);

              console.log(`Student: ${student.Name}, Is Available: ${isStudentAvailable}`);

              if (isStudentAvailable) {
                const randomCourse = getRandomItemFromArray(courses);

                const timesheetEntry = new TimeSheet({
                  Room: room,
                  timeSlot: timeSlot,
                  Course: randomCourse,
                  instructor: instructor,
                  students: [student],
                });

                await timesheetEntry.save();

                timesheet.push(timesheetEntry);
                roomFound = true;
                instructorFound = true;
                break;
              }
            }
          }

          if (instructorFound) {
            break;
          }
        }
      }

      if (!roomFound) {
        console.log(`No available room for time slot: ${timeSlot}`);
      }

      const totalHoursToday = timesheet.filter(entry => entry.timeSlot === timeSlot).length;

      console.log(`Total Hours Today for ${timeSlot.DayOfWeek}: ${totalHoursToday}`);

      if (totalHoursToday >= maxHoursPerDay) {
        console.log(`Maximum hours per day reached for time slot: ${timeSlot}`);
        break;
      }
    }

    console.log('Final Timesheet:', timesheet);

    return timesheet;
  } catch (err) {
    console.error('Error in generateTimeSheet:', err);
    throw err;
  }
};

function getRandomItemFromArray(array) {
  if (array.length === 0) {
    return undefined;
  }
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
