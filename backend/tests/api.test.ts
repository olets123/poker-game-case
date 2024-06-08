import {
  it,
  beforeAll,
  afterEach,
  expect,
  describe,
  afterAll,
  jest,
} from '@jest/globals'

import supertest from 'supertest'
import mongoose from 'mongoose'
import app from '../src/index'
import CardHand from '../src/models/CardHand'
import dotenv from 'dotenv'
dotenv.config()

const mongoURI = process.env.MONGO_DB_URI

if (!mongoURI) {
  throw new Error('MONGO_URI is not defined in the .env file')
}

const request = supertest(app)

// Connect to a test database
beforeAll(async () => {
  const url = mongoURI
  await mongoose.connect(url)
})

// Clean up the database after each test
afterEach(async () => {
  await CardHand.deleteMany()
})

// Disconnect from the test database
afterAll(async () => {
  await mongoose.connection.close()
})

describe('POST /api/generate-hand', () => {
  it('should generate a new hand and save it to the database', async () => {
    expect.hasAssertions()

    const response = await request.post('/api/generate-hand').send()
    expect(response.status).toBe(201)
    expect(response.body.hand).toHaveProperty('cards')
    expect(response.body.hand).toHaveProperty('rankings')

    const hands = await CardHand.find()
    expect(hands).toHaveLength(1)
  })

  it('should handle errors when generating a new hand', async () => {
    expect.assertions(2)

    jest.spyOn(CardHand.prototype, 'save').mockImplementationOnce(() => {
      throw new Error('Failed to save')
    })

    const response = await request.post('/api/generate-hand').send()
    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message', 'Internal Server Error')
  })
})

describe('GET /api/hands', () => {
  it('should get all hands from the database', async () => {
    await new CardHand({
      cards: ['kc', '5c', 'th', 'qd', 'ks'],
      rankings: 'One Pair',
    }).save()

    const response = await request.get('/api/hands').send()
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
  })

  it('should handle errors when getting hands', async () => {
    expect.assertions(2)

    jest.spyOn(CardHand, 'find').mockImplementationOnce(() => {
      throw new Error('Failed to find')
    })

    const response = await request.get('/api/hands').send()
    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message', 'Internal Server Error')
  })
})

describe('POST /api/compare-hands', () => {
  it('should return the winning hand and index', async () => {
    expect.assertions(3)

    const hands = [
      ['2h', '3d', '5s', '9c', 'kh'],
      ['as', 'kd', 'qh', 'jc', 'ts'],
    ]
    const response = await request.post('/api/compare-hands').send({ hands })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('winningHand')
    expect(response.body).toHaveProperty('winningIndex')
  })

  it('should return an error if less than two hands are provided', async () => {
    expect.assertions(2)

    const response = await request
      .post('/api/compare-hands')
      .send({ hands: [['2h', '3d', '5s', '9c', 'kh']] })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty(
      'error',
      'You must provide at least two hands to compare.'
    )
  })

  it('should handle invalid comparison results', async () => {
    const hands = [
      ['2h', '3d', '5s', '9c', 'kh'],
      ['as', 'kd', 'qh', 'jc', '10s'],
    ]
    const response = await request.post('/api/compare-hands').send({ hands })
    expect(response.status).toBe(500)
  })
})
