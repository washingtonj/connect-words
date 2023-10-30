"use client"

import Link from 'next/link'
import { useState } from 'react'
import { Button, Logo } from '@/components/ui'
import { Settings, Example } from '@/components/home'

export default function Page() {
  const [settingsModal, setSettingsModal] = useState(false)

  return (
    <div className="flex flex-col  justify-center w-full lg:max-w-2xl lg:m-auto px-4 pt-8">
      <div className='flex items-center justify-between'>
        <Logo />
        <Button onClick={() => setSettingsModal(true)} variant='neutral' size='icon'>⚙️</Button>
      </div>

      <span className='text-sm my-10'>
        Bem-vindo à emocionante aventura de palavras! Abaixo, você encontrará uma lista aleatória de palavras misteriosas, todas relacionadas a um tópico secreto.
        <br /><br />
        Selecione 5 palavras de cada vez e o jogo verificará se você formou o grupo correto. Não se preocupe com o número de tentativas, o desafio é ver quantos grupos você consegue descobrir no menor tempo possível.
        <br /><br />
        Prepare-se para desafios que vão do nível fácil ao mais difícil. Mergulhe na diversão das palavras e descubra todos os tópicos ocultos!
      </span>

      <Example />

      <div className='flex justify-center gap-2 border-t pt-2 mt-8'>
        <Link className='w-full mt-8' href="/game">
          <Button inline variant='primary'>🏁 - Iniciar</Button>
        </Link>
        <Link className='w-full mt-8' href="/ranking">
          <Button inline variant='neutral'>🏆 - Ranking</Button>
        </Link>
      </div>


      <footer className='border-t mt-10 py-6 text-xs'>
        <p>
          Gostaria de sugerir alguma melhoria ou reportar um bug? <a href="">Entre em contato</a> através do <a className='font-bold' href="https://github.com/washingtonj">GitHub</a>.
        </p>
      </footer>

      { settingsModal && <Settings onClose={() => setSettingsModal(false)} /> }
    </div>
  )
}