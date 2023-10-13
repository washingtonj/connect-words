"use client"

import Link from 'next/link'
import { useEffect } from "react";
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button";

export default function Result() {
  const router = useRouter()
  const query = useSearchParams()

  const queryData = query.get('v')

  const { attempts, combinations } = JSON.parse(atob(queryData || '') || '{}')
  const percentage = ((combinations.length / attempts) * 100).toFixed(1)

  useEffect(() => { if (!queryData) router.push('/') }, [queryData, router])

  return queryData ? (
    <div className="h-screen flex flex-col items-center justify-center px-8 lg:w-4/12 lg:m-auto">
      <span className="text-4xl mb-8">🏆</span>
      <h1 className="pb-4"><b>Parabéns</b>, você encontrou todos os tópicos!</h1>
      <p>Você teve <b>{percentage}%</b> de aproveitamento, conseguindo ligar todas as palavras em <b>{attempts} tentativas.</b></p>
      <span className="mt-4">
        <p className="capitalize"><b>Tópicos:</b> {combinations.join(', ')}</p>
      </span>

      <Link href="/">
        <Button className="mt-8">Iniciar uma nova partida</Button>
      </Link>
    </div>
  ) : (<></>)
}