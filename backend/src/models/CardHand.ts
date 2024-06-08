import mongoose from 'mongoose'

export interface GenerateHand {
  hand: IHand
}

export interface CompareHand {
  winningHand: string[]
  winningIndex: number
}

export interface IHand {
  cards: string[]
  rankings: string
}

const CardHandSchema = new mongoose.Schema<IHand>(
  {
    cards: [String],
    rankings: String,
  },
  {
    timestamps: true,
  }
)

const CardHand = mongoose.model<IHand>('CardHand', CardHandSchema)

export default CardHand
