const Moonwalk = require('../models/moonwalk');

module.exports = {
  create,
  createComment,
  index,
  delete: deleteMoonwalk,
};

// INDEX
async function index(req, res) {
  const moonwalks = await Moonwalk.find({}).populate('user').populate('comments.author').sort('-createdAt');
  res.json(moonwalks);
}

// CREATE
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
// DELETE
async function deleteMoonwalk(req, res) {
  try {
    await Moonwalk.findOneAndDelete({_id: req.params.moonwalkId, user: req.user._id});
    res.json({ message: 'Moonwalk deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete moonwalk' });
  }
}

// CREATE comment
async function createComment(req, res) {
  const moonwalk = await Moonwalk.findById(req.params.moonwalkId).populate('user').sort('-createdAt');
  req.body.author = req.user._id;
  moonwalk.comments.push(req.body);
  await moonwalk.populate('comments.author');
  await moonwalk.save();
  res.json(moonwalk);
}