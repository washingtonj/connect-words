import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GameExample } from '@/components/game'

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <span className="text-center flex items-center mt-2">
        <h2 className="text-2xl font-bold mr-2">Brennas</h2>
        <h1 className="text-md font-medium self-end">Connect Words</h1>
      </span>

      <span className="text-sm p-4">
        <p className="mb-8">Ligue 5 palavras que tenham alguma relação entre si.</p>
        <GameExample />
      </span>

      <Link className='mt-8' href="/game">
        <Button>Iniciar uma partida</Button>
      </Link>
    </div>
  )
}