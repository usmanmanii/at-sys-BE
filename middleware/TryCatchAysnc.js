const TryCatchAynsc = (Functiontocheck) => (req,res,next)=>{
Promise.resolve(Functiontocheck(req,res,next)).catch(next);
}

module.exports = TryCatchAynsc