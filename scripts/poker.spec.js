const {expect} = require('chai');
const {countValues, isFlush, isStraight, analyzeCards} = require('./poker');

describe('countValues', () => {
  let values;
  it('should return the count of each element', () => {
    values = [1, 8, 8, 10, 10];
    expect(countValues(values)).to.eql({
      1: 1,
      8: 2,
      10: 2
    });
  });
});

describe('isFlush', () => {
  let suits;
  it('should check if all elements in an array are the same', () => {
    suits = ['SPADES', 'CLUBS', 'HEARTS', 'HEARTS', 'DIAMONDS'];
    expect(isFlush(suits)).to.equal(false);

    suits = ['SPADES', 'SPADES', 'SPADES', 'SPADES', 'SPADES'];
    expect(isFlush(suits)).to.equal(true);
  });
});

describe('isStraight', () => {
  let values;
  it('should check if all elements in an array are consecutive when sorted', () => {
    values = [1, 5, 3, 2, 4];
    expect(isStraight(values)).to.equal(true);

    values = [12, 8, 5, 4, 10];
    expect(isStraight(values)).to.equal(false);
  });
});

describe('analyzeCards', () => {
  let values, suits;
  it('should correctly identify a pair', () => {
    values = [3, 1, 1, 8, 12];
    suits = ['HEARTS', 'SPADES', 'DIAMONDS', 'CLUBS', 'CLUBS'];
    expect(analyzeCards(values, suits)).to.equal('You got a Pair!');
  });

  it('should correctly identify two pairs', () => {
    values = [1, 1, 2, 8, 8];
    suits = ['HEARTS', 'SPADES', 'DIAMONDS', 'DIAMONDS', 'CLUBS'];
    expect(analyzeCards(values, suits)).to.equal('You got Two Pairs!');
  });

  it('should correctly identify three of a kind', () => {
    values = [7, 7, 2, 7, 12];
    suits = ['HEARTS', 'SPADES', 'DIAMONDS', 'CLUBS', 'CLUBS'];
    expect(analyzeCards(values, suits)).to.equal('You got Three of a Kind!');
  });

  it('should correctly identify full house', () => {
    values = [9, 2, 2, 9, 9];
    suits = ['HEARTS', 'SPADES', 'DIAMONDS', 'CLUBS', 'SPADES'];
    expect(analyzeCards(values, suits)).to.equal('You got Full House!');
  });

  it('should correctly identify four of a kind', () => {
    values = [8, 8, 8, 8, 12];
    suits = ['HEARTS', 'SPADES', 'DIAMONDS', 'CLUBS', 'CLUBS'];
    expect(analyzeCards(values, suits)).to.equal('You got Four of a Kind!');
  });

  it('should correctly identify a flush', () => {
    values = [7, 5, 2, 8, 10];
    suits = ['HEARTS', 'HEARTS', 'HEARTS', 'HEARTS', 'HEARTS'];
    expect(analyzeCards(values, suits)).to.equal('You got a Flush!');
  });

  it('should correctly identify a straight', () => {
    values = [10, 7, 11, 8, 9];
    suits = ['HEARTS', 'SPADES', 'DIAMONDS', 'CLUBS', 'CLUBS'];
    expect(analyzeCards(values, suits)).to.equal('You got a Straight!');
  });

  it('should correctly identify a straight flush', () => {
    values = [9, 8, 12, 10, 11];
    suits = ['CLUBS', 'CLUBS', 'CLUBS', 'CLUBS', 'CLUBS'];
    expect(analyzeCards(values, suits)).to.equal('You got a Straight Flush!');
  });
});
