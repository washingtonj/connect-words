"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { Wordcard } from '@/components/Wordcard'

export default function Home() {
  const [words, setWords] = useState<string[]>([])
  const [combinations, setCombinations] = useState<{ [key: string]: string[] } | undefined>(undefined)
  const [attempts, setAttempts] = useState(0)
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [validating, setValidating] = useState(false)
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  const combinationsColors = ['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-purple-400', 'bg-pink-400']

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


  useEffect(() => {
    if (selectedWords.length == 5) {
      validateCombination()
      setAttempts(prev => prev + 1)
    }
  }, [selectedWords, validateCombination])


  useEffect(() => {
    if (combinations && Object.keys(combinations).length == 6) {
      const base64 = btoa(JSON.stringify({ attempts, combinations: Object.keys(combinations) }))
      router.push(`/result?v=${base64}`, { scroll: true })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [combinations])


  useEffect(() => { loadWords() }, [])


  return (
    <main className="flex flex-col items-center mt-4 mb-8 px-2 lg:mt-24">
      {loading && (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}

      {!loading && (
        <div className="flex flex-col gap-4 px-2 w-full lg:px-20">
          <span className="flex items-center gap-2">
            <p className="font-bold">Tentativas:</p>
            <p>{attempts}</p>
          </span>

          <div className={`grid grid-cols-3 lg:grid-cols-6 gap-1 ${validating ? 'pointer-events-none' : ''}`}>
            {words.map((word) => (
              <Wordcard
                key={word}
                word={word}
                onClick={handleSelect}
                selected={selectedWords.includes(word)}
                bgColor={findColorOfSelectedWord(word)}
              />
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
