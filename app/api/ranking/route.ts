import ShortUniqueId from 'short-unique-id'
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ResultDTO } from '@/dtos'
import { WORDS_DB, WordDBDifficulty } from '@/lib/words'

const pointsByDifficulty = {
  easy: 5,
  medium: 10,
  hard: 15,
  veryHard: 20
} satisfies Record<WordDBDifficulty, number>


export async function POST(request: NextRequest) {
  // Get the data from the body
  const { attempts, combinations, time, playerName } = await request.json() as ResultDTO


  // Find the difficulty of the words and calculate the points
  let points = 0

  for (const difficulty in WORDS_DB) {
    const topicsByDifficulty = Object.keys(WORDS_DB[difficulty as WordDBDifficulty])

    for (const combination of combinations) {
      if (topicsByDifficulty.includes(combination)) {
        points += pointsByDifficulty[difficulty as WordDBDifficulty]
        continue
      }
    }
  }

  // Save the rank
  const data = await prisma.rank.create({
    data: {
      id: new ShortUniqueId().randomUUID(10),
      author: playerName,
      combinations,
      attempts,
      time,
      points,
    }
  })

  return Response.json({ id: data.id })
}