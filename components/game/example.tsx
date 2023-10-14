"use client"

import { useRenderCtx } from '@/hooks'
import { WORDS_DB } from "@/lib/words"
import { WordTable, WordCard, WordTopics } from "@/components/game"


export function GameExample() {
  const { isClient } = useRenderCtx()

  const example = [
    ...WORDS_DB['medio']['elementos químicos'],
    ...WORDS_DB['facil']['doces'],
    ...WORDS_DB['dificil']['epopeias clássicas']
  ].sort(() => Math.random() - 0.5)

  return isClient && (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-bold">Exemplo</p>

      <WordTable validating={true}>
        {
          example.map((word, index) => (
            <WordCard
              key={index}
              word={word}
              bgColor={WORDS_DB['medio']['elementos químicos'].includes(word) ? 'bg-red-500' : undefined}
              onClick={() => { }}
            />
          ))
        }
      </WordTable>
      <WordTopics
        findedTopics={['elementos químicos']}
        colors={['bg-red-500']}
      />
    </div>
  )
}