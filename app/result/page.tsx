import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Button } from "@/components/ui/button";
import { prisma } from '@/lib/prisma'

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Result({ searchParams }: Props) {
  const queryData = searchParams.v as string
  if (!queryData) redirect('/')

  const data = await prisma.rank.findUnique({ where: { id: queryData } })

  if (!data) redirect('/')

  const { attempts, time, combinations, points } = data
  const percentage = ((combinations.length / attempts) * 100).toFixed(1)


  return queryData ? (
    <div className="flex flex-col items-center justify-center pt-32 px-8 lg:w-4/12 lg:m-auto">
      <span className="text-4xl mb-8">🏆</span>
      <h1 className="pb-4"><b>Parabéns</b>, você encontrou todos os tópicos!</h1>
      <span className='flex flex-col gap-2'>
        <p>Você teve <b>{percentage}%</b> de aproveitamento, conseguindo ligar todas as palavras em <b>{time}</b> com <b>{attempts} tentativas.</b></p>
        <p>Com base na dificuldade dos tópicos, você conseguiu <b>{points}</b> pontos.</p>
      </span>
      <span className="text-center mt-4">
        <p className="capitalize"><b>Tópicos:</b> {combinations.join(', ')}</p>
      </span>

      <span className='flex gap-2'>
        <Link href="/game">
          <Button className="mt-8">🏁 Nova partida</Button>
        </Link>
        <Link href="/ranking">
          <Button className="mt-8">⭐️ Ranking</Button>
        </Link>
      </span>
    </div>
  ) : (<></>)
}