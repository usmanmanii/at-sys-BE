const verifyToken  = require('../middleware/jwtmiddleware');
const jwt = require("jsonwebtoken");
const Room = require('../models/roomSchema');
const TimeSlot = require('../models/timeSlotSchema'); 
const Course = require('../models/courseSchema'); 
const Instructor = require('../models/instructorSchema');
const Student = require('../models/studentSchema'); 
const timeSheet = require('../models/timesheetSchema');
const department = require('../models/departmentSchema');
const university = require('../models/universitySchema');
const classes = require('../models/classSchema');

async function Counts(Model) {
    try {
        const count = await Model.countDocuments();
        return count;
    } catch (error) {
        console.error(`Error counting for ${Model.modelName}:`, error);
        return 0;
    }
}

module.exports = {
    getAlldashboardCounts : async (req, res) => {
    try {
        verifyToken(req, res ,async()=>{ 

        if (!req.headers.authorization) {
            return res.status(401).json({ error: 'No Authorization header present' });
        }

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decoded.id;
        const userPosition = decoded.position;

        const count = {
            timesheetcount: await Counts(timeSheet),
            Studentcount: await Counts(Student),
            instructorcount: await Counts(Instructor),
            coursecount: await Counts(Course),
            timeslotcount: await Counts(TimeSlot),
            roomcount: await Counts(Room),
            classescount: await Counts(classes),
            universitycount: await Counts(university),
            departmentcount: await Counts(department),
        };

        res.status(200).json({ count, userId, userPosition });
    });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'error counting tables' });
    }
}
}