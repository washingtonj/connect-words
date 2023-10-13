import { NextApiRequest, NextApiResponse } from "next";
import { WORDS_DB } from '@/lib/words'
import { NextResponse } from "next/server";

type WordDBDifficulty = keyof typeof WORDS_DB
type WordDBTopic = keyof typeof WORDS_DB[WordDBDifficulty]

export async function GET(_request: Request) {
  const words: string[] = []

  const difficulties = Object.keys(WORDS_DB) as Array<WordDBDifficulty>

  while (words.length < 30) {
    const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)]

    const quantityOfTopics = Object.keys(WORDS_DB[difficulty]).length
    const randomSelectedTopic = Math.floor(Math.random() * quantityOfTopics)

    const topicName = Object.keys(WORDS_DB[difficulty])[randomSelectedTopic] as WordDBTopic
    const selectedTopic = WORDS_DB[difficulty][topicName] as string[]

    words.push(...selectedTopic)
  }

  const randomizedWords = words.sort(() => Math.random() - 0.5)

  return Response.json(randomizedWords)
}


export async function POST(request: Request) {
  const receivedWords = await request.json() as string[]

  for (const difficulty in WORDS_DB) {
    for (const topic in WORDS_DB[difficulty as WordDBDifficulty]) {
      const words = WORDS_DB[difficulty as WordDBDifficulty][topic as WordDBTopic] as string[]
      const isCorrect = words.every(word => receivedWords.includes(word))
      if (isCorrect) return Response.json({ [topic]: words })
    }
  }

  return NextResponse.json({ error: 'Combination not found!' }, { status: 404 })
}