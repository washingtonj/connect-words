import { cn } from "@/lib/utils"

type WordCardProps = {
  word: string
  selected?: boolean
  bgColor?: string
  onClick: (word: string) => void
}

export function WordCard(props: WordCardProps) {
  const className = cn([
    'transition-colors px-2 py-4 lg:px-2 lg:h-20 text-center text-sm flex items-center justify-center break-words border rounded-md cursor-pointer',
    props.selected ? "bg-slate-900 text-white" : "bg-white text-gray-900",
    props.bgColor && `pointer-events-none ${props.bgColor} text-white`
  ])

  return (
    <div
      className={className}
      onClick={() => props.onClick(props.word)}
    >
      {props.word}
    </div>
  )
}