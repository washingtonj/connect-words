import { COLORS } from '@/consts/game'

type TopicsProps = {
  findedTopics: string[];
}

export function Topics(props: TopicsProps) {
  return (
    <ul className="flex flex-col">
      {props.findedTopics.map((key, index) => (
        <li key={key} className="flex items-center gap-2 text-xs">
          <div className={`w-2 h-2 rounded-full`} style={{ background: COLORS[index] }} />
          <p className="capitalize">{key}</p>
        </li>
      ))}
    </ul>
  )
}