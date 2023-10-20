"use client"

import { useCallback, useEffect, useMemo, useState } from "react";
import { useMedia } from "react-use";
import { useRouter } from 'next/navigation'
import { WordTable, WordCard, WordTopics, WordStats } from '@/components/game'
import { Spinner } from '@/components/ui'
import { ResultDTO } from '@/dtos'

export default function Home() {
  const [words, setWords] = useState<string[]>([])
  const [combinations, setCombinations] = useState<{ [key: string]: string[] } | undefined>(undefined)
  const [attempts, setAttempts] = useState(0)
  const [selectedWords, setSelectedWords] = useState<string[]>([])

  const [playerName, setPlayerName] = useState<string>('')

  const [validating, setValidating] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  const startDate = useMemo(() => new Date(), [])

  const combinationsColors = [
    'bg-zinc-400 dark:bg-zinc-700',
    'bg-zinc-500 dark:bg-zinc-600',
    'bg-zinc-600 dark:bg-zinc-500',
    'bg-zinc-700 dark:bg-zinc-400',
    'bg-zinc-800 dark:bg-zinc-300',
    'bg-zinc-900 dark:bg-zinc-200',
  ];

  const isMobile = useMedia('only screen and (max-width: 640px)', false);

  const wordsSplitedByColumns = useMemo(() => {
    const wordsPerColumn = isMobile ? 10 : 5
    const wordsSplited = []

    for (let i = 0; i < words.length; i += wordsPerColumn) {
      wordsSplited.push(words.slice(i, i + wordsPerColumn))
    }

    return wordsSplited
  }, [words, isMobile])


  const validateCombination = useCallback(async () => {
    setValidating(true)

    try {
      const data = await fetch('/api/game', {
        method: 'POST',
        body: JSON.stringify(selectedWords),
      })

      const response = await data.json() as Record<string, string[]>

      if (response.error) return

      setCombinations(prev => ({ ...prev, ...response }))
    }

    catch (error) {
      alert(error)
    }

    finally {
      setValidating(false)
      setSelectedWords([])
    }
  }, [selectedWords])


  async function loadWords() {
    try {
      const data = await fetch('/api/game')
      const response = await data.json()
      setWords(response)
    }

    catch (error) {
      alert('Error on load words')
    }

    finally {
      setLoading(false)
    }
  }


  function handleSelect(item: string) {
    if (selectedWords.includes(item)) {
      setSelectedWords(selectedWords.filter((i) => i !== item));
    } else {
      setSelectedWords([...selectedWords, item]);
    }
  }

  function findColorOfSelectedWord(word: string) {
    if (!combinations) return

    const topicsByCombination = Object.values(combinations)
    const selectedWordIndex = topicsByCombination.findIndex((topic) => topic.includes(word))

    return combinationsColors[selectedWordIndex]
  }

  function calculateTimeDifference() {
    const diffInMilliseconds = new Date().getTime() - startDate.getTime();
    const diffInMinutes = Math.floor(diffInMilliseconds / 60000);
    const diffInSeconds = Math.floor((diffInMilliseconds % 60000) / 1000);

    return `${diffInMinutes}m ${diffInSeconds}s`;
  }

  function handlePlayerIdentification() {
    const playerName = localStorage.getItem('playerName')

    if (playerName) {
      setPlayerName(playerName)
      return
    }

    const inputedPlayerName = prompt('Crie um apelido para identificar seus resultados: e.g: "Linguiço/a"')

    if (inputedPlayerName) {
      const only12Characters = inputedPlayerName.slice(0, 12)
      localStorage.setItem('playerName', only12Characters)
      setPlayerName(only12Characters)
      return
    }

    router.push('/')
  }


  useEffect(() => {
    if (selectedWords.length == 5) {
      validateCombination()
      setAttempts(prev => prev + 1)
    }
  }, [selectedWords, validateCombination])


  useEffect(() => {
    if (combinations && Object.keys(combinations).length == 6) {
      setSubmitting(true)

      fetch(`/api/ranking`, {
        method: 'POST',
        body: JSON.stringify({
          playerName,
          attempts,
          combinations: Object.keys(combinations),
          time: calculateTimeDifference()
        } satisfies ResultDTO),
      })
        .then((response) => response.json())
        .then((data) => router.push(`/result?v=${data.id}`))
        .catch((error) => alert(error))
        .finally(() => setSubmitting(false))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [combinations])


  useEffect(() => {
    handlePlayerIdentification()
    loadWords()
  }, [])


  return (
    <main className="flex flex-col items-center mt-6 mb-8 lg:mt-24">
      {loading && <Spinner />}

      {submitting && (
        <div>
          <Spinner />
          <p className="text-center text-gray-500">Enviando resultados...</p>
        </div>
      )}

      {(!loading && !submitting) && (
        <div className="flex flex-col gap-4 px-1 w-full lg:px-20">
          <div className="px-2">
            <WordStats attempts={attempts} playerName={playerName} />
          </div>

          <div className="px-0.5">
            <WordTable validating={validating}>
              {wordsSplitedByColumns.map((column, index) => (
                <div key={index} className="grid gap-1">
                  {column.map((word) => (
                    <WordCard
                      key={word}
                      word={word}
                      selected={selectedWords.includes(word)}
                      bgColor={findColorOfSelectedWord(word)}
                      onClick={() => handleSelect(word)}
                    />
                  ))}
                </div>
              ))}
            </WordTable>
          </div>

          {combinations && (
            <div className="px-2">
              <WordTopics
                findedTopics={Object.keys(combinations)}
                colors={combinationsColors}
              />
            </div>
          )}
        </div>
      )}
    </main>
  );
}
