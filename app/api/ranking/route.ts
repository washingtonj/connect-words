import ShortUniqueId from 'short-unique-id'

import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Result } from '@/entities'
import { WORDS_DB, TopicDifficulty } from '@/database/words'

const pointsByDifficulty = {
  easy: 5,
  medium: 10,
  hard: 15,
  very_hard: 20
} satisfies Record<TopicDifficulty, number>


export async function POST(request: NextRequest) {
  const { attempts, combinations, time, playerName } = await request.json() as Result

  let points = 0

  for (const difficulty in WORDS_DB) {
    const topicsByDifficulty = Object.keys(WORDS_DB[difficulty as TopicDifficulty])

    for (const combination of combinations) {
      if (topicsByDifficulty.includes(combination)) {
        points += pointsByDifficulty[difficulty as TopicDifficulty]
        continue
      }
    }
  }
  
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