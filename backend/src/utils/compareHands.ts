import { analyzeHand } from './pokerUtils'

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
]

export const compareHands = (handOne: string[], handTwo: string[]): number => {
  const handOneRank = handRanks.indexOf(analyzeHand(handOne))
  const handTwoRank = handRanks.indexOf(analyzeHand(handTwo))
  return handOneRank - handTwoRank
}
