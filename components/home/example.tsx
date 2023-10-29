"use client"

import { memo } from 'react'
import { useRenderCtx } from '@/hooks'
import { WORDS_DB } from "@/database/words"
import { Table, Card, Topics } from "@/components/game"
import { Spinner } from '@/components/ui'
import { COLORS } from '@/consts/game'


// eslint-disable-next-line react/display-name
export const Example = memo(() => {
  const { isClient } = useRenderCtx()

  const example = [
    ...WORDS_DB['medium']['elementos químicos'],
    ...WORDS_DB['easy']['doces'],
    ...WORDS_DB['hard']['antigos impérios']
  ].sort(() => Math.random() - 0.5)

  return isClient ? (
    <div className="flex flex-col w-full gap-4">
      <p className="text-sm font-bold">Exemplo</p>

      <Table isExample>
        {
          example.map((word, index) => (
            <Card
              key={index}
              word={word}
              bgColor={WORDS_DB['medium']['elementos químicos'].includes(word) ? COLORS[0] : undefined}
              onClick={() => { }}
            />
          ))
        }
      </Table>
      
      <Topics findedTopics={['elementos químicos']} />
    </div>
  ) : <div className='flex items-center justify-center'>
    <Spinner />
  </div>
})

