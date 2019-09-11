Welcome to Poker Hand, an app that will identify the best poker hand upon draw.

Implemented using Deck of Cards API.

As this API provided card decks that were persistent, and the ability to shuffle and draw cards from the same deck, no database was used in this app. Express.js was simply used to create routes that acted as intermediaries for Deck of Cards API requests. The poker script was then used to provide methods for identifying different poker hands -- test specs were written for those methods as well. Then, vanilla JavaScript was used to render messages created from the poker script methods, and card images provided from the API.

Instructions:

1. npm install
2. npm start -- for node live-server
3. npm test -- for node unit testing via mocha and chai
