const suits = ['h', 'd', 's', 'c']
const values = ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a']

// direct mapping of each card value to its index
const cardValueIndexMap = new Map(values.map((value, index) => [value, index]))

const createDeck = (): string[] => {
  const deck: string[] = []
  for (const suit of suits) {
    for (const value of values) {
      deck.push(value + suit)
    }
  }
  return deck
}

// Fisher-Yates algorithm

const shuffleDeck = (deck: string[]): string[] => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }
  return deck
}

// generate hand of 5 cards

export const generateHand = (): string[] => {
  const deck = createDeck()
  const shuffledDeck = shuffleDeck(deck)
  return shuffledDeck.slice(0, 5)
}

// analyze hand

export const analyzeHand = (hand: string[]): string => {
  const counts = hand.reduce((acc, card) => {
    const value = card[0]
    acc[value] = (acc[value] || 0) + 1
    return acc
  }, {} as { [key: string]: number })

  const suitCounts = hand.reduce((acc, card) => {
    const suit = card[1]
    acc[suit] = (acc[suit] || 0) + 1
    return acc
  }, {} as { [key: string]: number })

  const values = Object.values(counts)
  const suitsInHand = Object.values(suitCounts)

  const isFlush = suitsInHand.some((count) => count === 5)

  const handValueIndices = hand.map((card) => {
    const value = card[0]
    const index = cardValueIndexMap.get(value) // retrieves the index of each card
    if (index === undefined) throw new Error(`Invalid card value: ${value}`)
    return index
  })

  const sortedHandValueIndices = handValueIndices.sort((a, b) => a - b)

  const isStraight = sortedHandValueIndices.every((val, index, arr) => {
    if (index === 0) return true
    return val === arr[index - 1] + 1
  })

  const isStraightFlush = isFlush && isStraight

  if (isStraightFlush) return 'Straight Flush'
  if (isFlush) return 'Flush'
  if (isStraight) return 'Straight'
  if (values.includes(4)) return 'Four of a Kind'
  if (values.includes(3) && values.includes(2)) return 'Full House'
  if (values.includes(3)) return 'Three of a Kind'
  if (values.filter((v) => v === 2).length === 2) return 'Two Pair'
  if (values.includes(2)) return 'One Pair'
  return 'High Card'
}
