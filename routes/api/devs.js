const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Game = require('../../models/Game');
const Dev = require('../../models/Dev');

// @route   POST api/devs
// @desc    Create a dev
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
      check('logo', 'Logo is required')
        .not()
        .isEmpty(),
      check('description', 'Description is required')
        .not()
        .isEmpty(),
      check('web', 'Website is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // const user = await User.findById(req.user.id).select('-password');
      const newDev = new Dev({
        name: req.body.name,
        logo: req.body.logo,
        description: req.body.description,
        foundingDate: req.body.foundingDate,
        hq: req.body.hq,
        web: req.body.web
      });
      const dev = await newDev.save();
      res.json(dev);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/devs
// @desc    Get ALL devs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const devs = await Dev.find();
    res.json(devs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/devs/:id
// @desc    Get dev by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const dev = await Dev.findById(req.params.id);
    
    // Check if there's a developer with that ID:
    if (!dev) {
      return res.status(404).json({ msg: 'Developer not found' });
    }

    // Get games where developer matches the request id:
    const devsGames = await Game.find({ developer: req.params.id });

    res.json({dev, devsGames});
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Developer not found' });
    }
    res.status(500).send('Server Error');
  }
});


module.exports = router;
