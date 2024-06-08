"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHands = void 0;
const pokerUtils_1 = require("./pokerUtils");
const handRanks = [
    'High Card',
    'One Pair',
    'Two Pair',
    'Three of a Kind',
    'Straight',
    'Flush',
    'Full House',
    'Four of a Kind',
    'Straight Flush',
];
const compareHands = (handOne, handTwo) => {
    const handOneRank = handRanks.indexOf((0, pokerUtils_1.analyzeHand)(handOne));
    const handTwoRank = handRanks.indexOf((0, pokerUtils_1.analyzeHand)(handTwo));
    return handOneRank - handTwoRank;
};
exports.compareHands = compareHands;
