import { cn } from "@/lib/utils"

type WordCardProps = {
  word: string
  selected?: boolean
  bgColor?: string
  onClick: (word: string) => void
}

export function Wordcard(props: WordCardProps) {


  const className = cn([
    'transition-colors p-2 lg:px-2 lg:h-20  text-center text-sm flex items-center justify-center break-words border rounded-md cursor-pointer',
    props.selected ? "bg-black text-white" : "bg-white text-gray-900",
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