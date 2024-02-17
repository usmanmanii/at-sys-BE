
const pagelimit = (req) =>{
const page = Number(req.query.page) || 1;
const limit = Number(req.query.limit) || 3;

const skip = (page -1 )*limit;

return {page,limit,skip};

}

module.exports = pagelimit;