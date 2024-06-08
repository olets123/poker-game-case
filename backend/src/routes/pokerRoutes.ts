import { Router } from 'express'
import { generateHand, analyzeHand } from '../utils/pokerUtils'
import CardHand from '../models/CardHand'
import { compareHands } from '../utils/compareHands'

const router = Router()

// Generate new hand
router.post('/generate-hand', async (_req, res) => {
  try {
    const newHand = generateHand()
    const rankings = analyzeHand(newHand)
    const hand = new CardHand({ cards: newHand, rankings: rankings })
    await hand.save()
    res.status(201).json({ hand, rankings: rankings })
  } catch (error) {
    console.error('Error generating hand:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// Get all hands
router.get('/hands', async (_req, res) => {
  try {
    const hands = await CardHand.find()
    res.status(200).json(hands)
  } catch (error) {
    console.error('Error getting hands:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// Compare hands
router.post('/compare-hands', (req, res) => {
  const hands: string[][] = req.body.hands
  if (!hands || hands.length < 2) {
    return res
      .status(400)
      .send({ error: 'You must provide at least two hands to compare.' })
  }

  let winningHand = hands[0]
  let winningIndex = 0

  // iterate through all the hands and finds the hand with the highest rank
  for (let i = 1; i < hands.length; i++) {
    const comparisonResult = compareHands(winningHand, hands[i])
    if (typeof comparisonResult !== 'number') {
      console.error('Invalid comparison result:', comparisonResult)
      return res.status(500).send({ error: 'Invalid comparison result.' })
    }
    if (comparisonResult < 0) {
      winningHand = hands[i]
      winningIndex = i
    }
  }

  res.json({
    winningHand,
    winningIndex,
  })
})

export default router
