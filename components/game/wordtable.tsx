import { PropsWithChildren } from "react";

type WordTableProps = {
  validating: boolean
} & PropsWithChildren

export function WordTable(props: WordTableProps) {
  return (
    <div className={`grid grid-cols-3 lg:grid-cols-6 gap-1 ${props.validating ? 'pointer-events-none' : ''}`}>
      {props.children}
    </div>
  )
}