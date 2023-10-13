"use client";

import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [words, setWords] = useState<string[]>([])
  const [combinations, setCombinations] = useState<{ [key: string]: string[] } | undefined>(undefined)
  const [attempts, setAttempts] = useState(0)
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [validating, setValidating] = useState(false)
  const [loading, setLoading] = useState(true)


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


  useEffect(() => {
    if (selectedWords.length == 5) {
      validateCombination()
      setAttempts(prev => prev + 1)
    }
  }, [selectedWords, validateCombination])

  useEffect(() => { loadWords() }, [])


  return (
    <main className="px-4 flex flex-col items-center">
      <h1 className="font-bold text-lg py-20 uppercase">Brennas Connect</h1>

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
              <div
                key={word}
                className={`transition-colors px-4 text-center h-20 text-sm flex items-center justify-center break-words border rounded-md cursor-pointer ${selectedWords.includes(word) ? "bg-black text-white" : "bg-gray-100 text-gray-700"}`}
                onClick={() => handleSelect(word)}
              >
                {word}
              </div>
            ))}
          </div>

          {combinations && (
            <ul className="flex flex-col">
              {Object.keys(combinations).map(key => (
                <li key={key} className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-red-200 rounded-full" />
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
