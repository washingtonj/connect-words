"use client"

import { useRenderCtx } from "@/hooks"

type Props = {
  date: Date
  className?: string
}

export function DateTime(props: Props) {
  const { isClient } = useRenderCtx()

  if (!isClient) return null

  return (
    <p className={props.className}>
      {props.date.toLocaleString('pt-BR')}
    </p>
  )
}