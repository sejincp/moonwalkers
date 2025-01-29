const Moonwalk = require('../models/moonwalk');

module.exports = {
  create,
  index
};

// GET 
async function index(req, res) {
  const moonwalks = await Moonwalk.find({}).populate('user').sort('-createdAt');
  res.json(moonwalks);
}

async function create(req, res) {
  try {
    req.body.user = req.user._id;
    const moonwalk = await Moonwalk.create(req.body);
    res.json(moonwalk);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Create moonwalk Failed' });
  }
}

// async function update(req, res) {
//   try {
//     const moonwalk = await Moonwalk.findOneAndUpdate(
//       {}
//     )
//   } 
// }(params) {
  
// }