import { cn } from "@/lib/utils"

type CardProps = {
  word: string
  selected?: boolean
  bgColor?: string
  onClick: (word: string) => void
}

export function Card(props: CardProps) {
  return (
    <div
      style={{ backgroundColor: props.bgColor  }}
      className={cn([
        'flex items-center justify-center px-2 py-4 lg:px-2 lg:h-20 rounded-md transition-all duration-200 hover:bg-zinc-200 cursor-pointer',
        props.selected ? "bg-zinc-950 hover:bg-zinc-950 text-white" : "bg-zinc-100 dark:bg-zinc-800",
        props.bgColor && `pointer-events-none text-white`
      ])}
      onClick={() => props.onClick(props.word)}
    >
      <p className="text-center text-sm break-words">
        {props.word}
      </p>
    </div>
  )
}