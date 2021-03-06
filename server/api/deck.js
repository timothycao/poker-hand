const router = require('express').Router();
const fetch = require('node-fetch');
module.exports = router;

router.get('/new', async (req, res, next) => {
  const apiResponse = await fetch('https://deckofcardsapi.com/api/deck/new/');  // Deck of Cards API request for a new deck
  const deck = await apiResponse.json();
  res.send(deck);
});

router.put('/:deckId/shuffle', async (req, res, next) => {
  const deckId = req.params.deckId;
  const apiResponse = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);  // Deck of Cards API request to shuffle a specified deck
  const deck = await apiResponse.json();
  res.send(deck);
});

router.put('/:deckId/draw/:count', async (req, res, next) => {
  const {deckId, count} = req.params;
  const apiResponse = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`);  // Deck of Cards API request to draw a specified number of cards from a specified deck
  const deck = await apiResponse.json();
  res.send(deck);
});
