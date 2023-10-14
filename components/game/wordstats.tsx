type WordStatsProps = {
  attempts: number
}

export function WordStats(props: WordStatsProps) {
  return (
    <span className="flex items-center gap-2">
      <p className="font-bold">Tentativas:</p>
      <p>{props.attempts}</p>
    </span>
  )
}