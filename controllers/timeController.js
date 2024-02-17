const TimeSlot = require('../models/timeSlotSchema');
const TryCatchAynsc = require('../middleware/TryCatchAysnc');
const pagelimit =  require('../utils/pagelimit');

exports.createTimeSlot = TryCatchAynsc(async (req, res) => {
 
    const timeSlot = new TimeSlot(req.body);
    await timeSlot.save();
    res.status(201).json({ message: "Created New Time slot successfully" ,timeSlot});
  
});

exports.getAllTimeSlots = TryCatchAynsc(async (req, res) => {
 
    const timeSlots = await TimeSlot.find();
    const { page, limit , skip } = await pagelimit(req);
    timeSlots = await TimeSlot.find().skip(skip).limit(limit);
    res.status(200).json({ message: "ALL Time slots Retrived successfully" ,timeSlots ,  timeslotsCounts: timeSlots.length});
 
});

exports.getTimeSlotById =TryCatchAynsc( async (req, res) => {
  const id = req.params.id;
  
    const timeSlot = await TimeSlot.findById(id);
    if (!timeSlot) {
      return res.status(404).json({ error: "Time slot not found" });
    }
    res.status(200).json({ message: "Time slot retrived successfully" ,timeSlot});
  
});


exports.updateTimeSlotById = TryCatchAynsc(async (req, res) => {
  const id = req.params.id;
  
    const updatedTimeSlot = await TimeSlot.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTimeSlot) {
      return res.status(404).json({ error: "Time slot not found" });
    }
    res.status(200).json({ message: "Time slot Updated successfully" ,updatedTimeSlot});
 
});


exports.deleteTimeSlotById = TryCatchAynsc(async (req, res) => {
  const id = req.params.id;
  const {harddelete} = req.body;
  
   if (!harddelete) {
      const time = await TimeSlot.findByIdAndUpdate(id,
        { delete: true },
        { new: true }
      );
      res.status(200).json({ message: "TimeSlot deleted softly successfully" });
      if (!time) {
        return res.status(404).json({ error: "TimeSlot not found" });
      }
    }
    else {
      const time = await TimeSlot.findByIdAndDelete(id);
      if (!time) {
        res.status(404).json({ message: "TimeSlot not found" });
      }
      res.status(200).json({ message: "TImeSlot deleted hardly successfully" });

    }
 
});
