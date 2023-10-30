import { DateTime, Logo, Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import { prisma } from '@/lib/prisma'
import { cache } from 'react'

const REAVALIDATE_TIME = 1 * 60

export const revalidate = REAVALIDATE_TIME

const getServerSideProps = cache(async () => {
  const data = await prisma.rank.findMany({
    where: {},
    orderBy: [
      { points: 'desc' },
      { attempts: 'asc' },
      { time: 'asc' },
    ],
    take: 10,
  })

  return data
})

export default async function Ranking() {
  const data = await getServerSideProps()
  const nextUpdate = new Date(new Date().getTime() + (REAVALIDATE_TIME * 1000))
  const hasData = data.length > 0

  return (
    <div className='pt-8 px-4 lg:max-w-2xl pb-10 lg:m-auto'>
      <div className='flex items-center justify-between mb-12'>
        <Logo />
        <div>
          <p className="text-sm text-gray-500">Próxima atualização: <b><DateTime date={nextUpdate} /></b></p>
        </div>
      </div>

      <div className='flex flex-col gap-8 text-sm'>
        {
          hasData && (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Nome</TableHead>
                    <TableHead className="text-center">Tempo</TableHead>
                    <TableHead className="text-center">Tentativas</TableHead>
                    <TableHead className="text-center">Pontos</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    data.map((user, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-center">{user.author || '👻'}</TableCell>
                        <TableCell className="text-center">{user.time}</TableCell>
                        <TableCell className="text-center">{user.attempts}</TableCell>
                        <TableCell className="text-center">{user.points}</TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>


              <span>
                <p><b>Tempo</b> é o tempo que o jogador levou para completar o jogo.</p>
                <p><b>Pontos</b> é a pontuação que o jogador obteve com base na dificuldade dos tópicos.</p>
              </span>
            </>
          )
        }


        {
          !hasData && (
            <div className="flex flex-col items-center justify-center gap-4">
              <h1 className="text-2xl font-bold">Nenhum dado encontrado.</h1>
              <p className="text-sm text-gray-500">Tente novamente mais tarde.</p>
            </div>
          )
        }
      </div>
    </div>
  )
}