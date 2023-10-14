import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GameExample } from '@/components/game'

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <span className='flex flex-col items-center'>
        <span className="text-center flex items-center mt-2">
          <h2 className="text-2xl font-bold mr-2">Brennas</h2>
          <h1 className="text-md font-medium self-center">Connect Words</h1>
        </span>
      </span>

      <span className='lg:w-6/12 text-sm my-10'>
        Bem-vindo à emocionante aventura de palavras! Abaixo, você encontrará uma lista aleatória de palavras misteriosas, todas relacionadas a um tópico secreto.
        <br /><br />
        Selecione 5 palavras de cada vez e o jogo verificará se você formou o grupo correto. Não se preocupe com o número de tentativas, o desafio é ver quantos grupos você consegue descobrir no menor tempo possível.
        <br /><br />
        Prepare-se para desafios que vão do nível fácil ao mais difícil. Mergulhe na diversão das palavras e descubra todos os tópicos ocultos!
      </span>

      <span className="text-sm p-4">
        <GameExample />
      </span>

      <Link className='mt-8' href="/game">
        <Button>Iniciar uma partida</Button>
      </Link>
    </div>
  )
}