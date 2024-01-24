const mongoose = require('mongoose');
const dashboardSchema = new mongoose.Schema({
room:{type:mongoose.Schema.Types.ObjectId,ref :'Room' , required:true}  ,
class:{type:mongoose.Schema.Types.ObjectId,ref :'Class' , required:true}  ,
course:{type:mongoose.Schema.Types.ObjectId,ref :'Course' , required:true}  ,
department:{type:mongoose.Schema.Types.ObjectId,ref :'Department' , required:true},  
instructor:{type:mongoose.Schema.Types.ObjectId,ref :'Instructor' , required:true} , 
student:{type:mongoose.Schema.Types.ObjectId,ref :'Student' , required:true}  ,
    university: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },  
    delete: { type: Boolean, default: false }

})

const dashboard = mongoose.model('dashboard', dashboardSchema);

module.exports = dashboard;