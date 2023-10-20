import { cn } from "@/lib/utils"

type WordCardProps = {
  word: string
  selected?: boolean
  bgColor?: string
  onClick: (word: string) => void
}

export function WordCard(props: WordCardProps) {
  return (
    <div
      className={cn([
        'flex items-center justify-center px-2 py-4 lg:px-2 lg:h-20 rounded-md transition-all duration-200 hover:bg-zinc-200 cursor-pointer',
        props.selected ? "bg-zinc-950 hover:bg-zinc-950 text-white" : "bg-zinc-100 dark:bg-zinc-800",
        props.bgColor && `pointer-events-none text-white ${props.bgColor}`
      ])}
      onClick={() => props.onClick(props.word)}
    >
      <p className="text-center text-sm break-words">
        {props.word}
      </p>
    </div>
  )
}