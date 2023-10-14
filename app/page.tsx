"use client"

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from 'next/navigation'
import { Wordcard } from '@/components/Wordcard'
import { useMedia } from "react-use";

export default function Home() {
  const [words, setWords] = useState<string[]>([])
  const [combinations, setCombinations] = useState<{ [key: string]: string[] } | undefined>(undefined)
  const [attempts, setAttempts] = useState(0)
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [validating, setValidating] = useState(false)
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  const startDate = useMemo(() => new Date(), [])

  const combinationsColors = ['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-purple-400', 'bg-pink-400']

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
      const data = await fetch('/api', {
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
      const data = await fetch('/api')
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


  useEffect(() => {
    if (selectedWords.length == 5) {
      validateCombination()
      setAttempts(prev => prev + 1)
    }
  }, [selectedWords, validateCombination])


  useEffect(() => {
    if (combinations && Object.keys(combinations).length == 6) {
      const base64 = btoa(JSON.stringify({
        attempts,
        combinations: Object.keys(combinations),
        time: calculateTimeDifference()
      }))
      router.push(`/result?v=${base64}`, { scroll: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [combinations])


  useEffect(() => { loadWords() }, [])


  return (
    <main className="flex flex-col items-center mt-6 mb-8 px-2 lg:mt-24">
      {loading && (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}

      {!loading && (
        <div className="flex flex-col gap-4 px-1 w-full lg:px-20">
          <span className="flex items-center gap-2">
            <p className="font-bold">Tentativas:</p>
            <p>{attempts}</p>
          </span>

          <div className={`grid grid-cols-3 lg:grid-cols-6 gap-1 ${validating ? 'pointer-events-none' : ''}`}>
            {wordsSplitedByColumns.map((column, index) => (
              <div key={index} className="grid gap-1">
                {column.map((word) => (
                  <Wordcard
                    key={word}
                    word={word}
                    selected={selectedWords.includes(word)}
                    bgColor={findColorOfSelectedWord(word)}
                    onClick={() => handleSelect(word)}
                  />
                ))}
              </div>
            ))}
          </div>

          {combinations && (
            <ul className="flex flex-col">
              {Object.keys(combinations).map((key, index) => (
                <li key={key} className="flex items-center gap-2 text-xs">
                  <div className={`w-2 h-2 rounded-full ${combinationsColors[index]}`} />
                  <p className="capitalize">{key}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </main>
  );
}
