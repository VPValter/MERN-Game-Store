const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Dev = require('../../models/Dev');
const Game = require('../../models/Game');

// @route   POST api/games
// @desc    Create a game
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('posterImg', 'Image is required')
        .not()
        .isEmpty(),
      check('developer', 'Developer is required')
        .not()
        .isEmpty(),
      check('price', 'Price is required')
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
      const newGame = new Game({
        title: req.body.title,
        posterImg: req.body.posterImg,
        developer: req.body.developer,
        // publisher: req.body.publisher,
        date: req.body.date,
        tags: req.body.tags,
        description: req.body.description,
        price: req.body.price
      });
      const game = await newGame.save();
      res.json(game);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/games
// @desc    Get ALL games
// @access  Public
router.get('/', async (req, res) => {
  try {
    const games = await Game.find();
    res.json({gameResults: games});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/games/:id
// @desc    Get game by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id).populate('developer', 'name');
    // Check if there's a game with that ID:
    if (!game) {
      return res.status(404).json({ msg: 'Game not found' });
    }

    res.json(game);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Game not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   GET api/games/tags/:tag
// @desc    Get games by tag
// @access  Public
router.get('/tags/:tag', async (req, res) => {
  try {
    const gameResults = await Game.find({ tags: req.params.tag });
    // Check if there's a game with that ID:
    if (!gameResults || gameResults.length < 1) {
      return res.status(404).json({ msg: 'No games found' });
    }

    res.json({gameResults});
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'No games found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   GET api/games/search/:query
// @desc    Get games by query
// @access  Public
router.get('/search/:query', async (req, res) => {
  try {
    const searchExp = new RegExp(req.params.query, 'gi');

    const gameResults = await Game.find({
      $or: [
        { title: searchExp },
        { description: searchExp }
      ]
    });

    const devResults = await Dev.find({ name: searchExp });

    return res.json({gameResults, devResults});
    
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Game not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
