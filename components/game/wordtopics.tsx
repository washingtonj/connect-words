type WordTopicsProps = {
  findedTopics: string[];
  colors: string[];
}

export function WordTopics(props: WordTopicsProps) {
  return (
    <ul className="flex flex-col">
      {props.findedTopics.map((key, index) => (
        <li key={key} className="flex items-center gap-2 text-xs">
          <div className={`w-2 h-2 rounded-full ${props.colors[index]}`} />
          <p className="capitalize">{key}</p>
        </li>
      ))}
    </ul>
  )
}