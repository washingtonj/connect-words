import { NextResponse } from "next/server";
import { WORDS_DB, TopicDifficulty, Topic } from '@/database/words'
import { Settings } from '@/entities'

const QUANTITY_OF_NECESSARY_WORDS = 30

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams
  const difficultyParam = params.get('difficulty') as Settings['difficulty'] | null
  
  let difficulties = Object.keys(WORDS_DB) as Array<TopicDifficulty>
  
  if (difficultyParam) {
    const difficultyIndex = difficulties.indexOf(difficultyParam)
    difficulties = difficulties.slice(0, difficultyIndex + 1) 
  }
  
  const usedWords: string[] = []
  const usedTopics: Topic[] = []

  while (usedWords.length < QUANTITY_OF_NECESSARY_WORDS) {
    const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)]

    const quantityOfTopics = Object.keys(WORDS_DB[difficulty]).length
    const randomSelectedTopic = Math.floor(Math.random() * quantityOfTopics)

    const topicName = Object.keys(WORDS_DB[difficulty])[randomSelectedTopic] as Topic
    const selectedTopic = WORDS_DB[difficulty][topicName] as string[]

    if (usedTopics.includes(topicName)) continue

    usedTopics.push(topicName)
    usedWords.push(...selectedTopic)
  }

  const randomizedWords = usedWords.sort(() => Math.random() - 0.5)

  return Response.json(randomizedWords)
}


export async function POST(request: Request) {
  const receivedWords = await request.json() as string[]

  for (const difficulty in WORDS_DB) {
    for (const topic in WORDS_DB[difficulty as TopicDifficulty]) {
      const words = WORDS_DB[difficulty as TopicDifficulty][topic as Topic] as string[]
      const isCorrect = words.every(word => receivedWords.includes(word))
      if (isCorrect) return Response.json({ [topic]: words })
    }
  }

  return NextResponse.json({ error: 'Combination not found!' }, { status: 404 })
}