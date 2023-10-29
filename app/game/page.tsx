"use client"

import { useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from 'next/navigation'
import { Table, Stats, Topics, Card } from '@/components/game'
import { Spinner } from '@/components/ui'
import { Result } from '@/entities'
import { SettingsContext } from "@/contexts";
import { COLORS } from '@/consts/game'

export default function Game() {
  const router = useRouter()
  
  const [settings, setSettings] = useContext(SettingsContext)
  
  const [words, setWords] = useState<string[]>([])
  const [combinations, setCombinations] = useState<{ [key: string]: string[] } | undefined>(undefined)
  const [attempts, setAttempts] = useState(0)
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [validating, setValidating] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  const startDate = useMemo(() => new Date(), [])


  function handleSelect(item: string) {
    if (selectedWords.includes(item)) {
      setSelectedWords(selectedWords.filter((i) => i !== item));
      return
    }
    setSelectedWords([...selectedWords, item]);
  }


  function findColorOfSelectedWord(word: string) {
    if (!combinations) return

    const topicsByCombination = Object.values(combinations)
    const selectedWordIndex = topicsByCombination.findIndex((topic) => topic.includes(word))

    return COLORS[selectedWordIndex]
  }

  // Validate if nickname is setted on start
  useEffect(() => {
    (async () => {
      if (settings.nickname) return

      const inputedPlayerName = prompt('Crie um apelido para identificar seus resultados: e.g: "Linguiço/a"')

      if (inputedPlayerName) {
        const only12Characters = inputedPlayerName.slice(0, 12)
        setSettings({ type: 'SET_NICKNAME', payload: only12Characters })
        return
      }

      router.push('/')
    })()
  }, [router, setSettings, settings.nickname])


  // Load words from API on start
  useEffect(() => {
    (async () => {
      try {
        const data = await fetch(`/api/game?difficulty=${settings.difficulty}`)
        const response = await data.json()
        setWords(response)
      }

      catch (error) {
        alert('Error on load words')
        router.push('/')
      }

      finally {
        setLoading(false)
      }
    })()
  }, [router, settings.difficulty])


  // Validate if all selected words is from the same combination
  useEffect(() => {
    if (selectedWords.length !== 5) return

    (async () => {
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

      setAttempts(prev => prev + 1)
    })()
  }, [selectedWords])


  // Submit result if all combinations are finded
  useEffect(() => {
    function calculateTimeDifference() {
      const diffInMilliseconds = new Date().getTime() - startDate.getTime();
      const diffInMinutes = Math.floor(diffInMilliseconds / 60000);
      const diffInSeconds = Math.floor((diffInMilliseconds % 60000) / 1000);
      return `${diffInMinutes}m ${diffInSeconds}s`;
    }

    const allCombinationsFinded = combinations && Object.keys(combinations).length === 6

    if (allCombinationsFinded && settings.nickname) {
      setSubmitting(true)

      fetch(`/api/ranking`, {
        method: 'POST',
        body: JSON.stringify({
          playerName: settings.nickname,
          attempts,
          combinations: Object.keys(combinations),
          time: calculateTimeDifference()
        } satisfies Result),
      })
        .then((response) => response.json())
        .then((data) => router.push(`/result?v=${data.id}`))
        .catch((error) => alert(error))
        .finally(() => setSubmitting(false))
    }

  }, [attempts, combinations, router, settings.nickname, startDate])



  return (
    <main className="flex flex-col items-center mt-6 mb-8 lg:mt-24">
      {loading && <Spinner />}

      {submitting && (
        <div>
          <Spinner />
          <p className="text-center text-gray-500">Enviando resultados...</p>
        </div>
      )}

      {(!loading && !submitting && settings.nickname) && (
        <div className="flex flex-col gap-4 px-1 w-full lg:px-20">
          <div className="px-2">
            <Stats attempts={attempts} playerName={settings.nickname} />
          </div>

          <div className="px-0.5">
            <Table validating={validating}>
              {words.map((word) => (
                <Card
                  key={word}
                  word={word}
                  selected={selectedWords.includes(word)}
                  bgColor={findColorOfSelectedWord(word)}
                  onClick={() => handleSelect(word)}
                />
              ))}
            </Table>
          </div>

          {combinations && (
            <div className="px-2">
              <Topics findedTopics={Object.keys(combinations)} />
            </div>
          )}
        </div>
      )}
    </main>
  );
}
