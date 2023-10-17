type WordStatsProps = {
  attempts: number
  playerName: string
}

export function WordStats(props: WordStatsProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2">
        <p className="font-bold">Tentativas:</p>
        <p>{props.attempts}</p>
      </span>
      <span className="text-sm font-medium">{props.playerName}</span>
    </div>
  )
}