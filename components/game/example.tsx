"use client"

import { memo } from 'react'
import { useRenderCtx } from '@/hooks'
import { WORDS_DB } from "@/database/words"
import { WordTable, WordCard, WordTopics } from "@/components/game"
import { Spinner } from '@/components/ui'


// eslint-disable-next-line react/display-name
export const GameExample = memo(() => {
  const { isClient } = useRenderCtx()

  const example = [
    ...WORDS_DB['medium']['elementos químicos'],
    ...WORDS_DB['easy']['doces'],
    ...WORDS_DB['hard']['antigos impérios']
  ].sort(() => Math.random() - 0.5)

  return isClient ? (
    <div className="flex flex-col w-full gap-4">
      <p className="text-sm font-bold">Exemplo</p>

      <WordTable validating={true} className='lg:grid-cols-5'>
        {
          example.map((word, index) => (
            <WordCard
              key={index}
              word={word}
              bgColor={WORDS_DB['medium']['elementos químicos'].includes(word) ? 'bg-zinc-800 dark:bg-zinc-500' : undefined}
              onClick={() => { }}
            />
          ))
        }
      </WordTable>
      <WordTopics
        findedTopics={['elementos químicos']}
        colors={['bg-zinc-800 dark:bg-zinc-500']}
      />
    </div>
  ) : <div className='flex items-center justify-center'>
    <Spinner />
  </div>
})

