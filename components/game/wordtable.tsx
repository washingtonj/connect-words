import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type WordTableProps = {
  validating: boolean
  className?: string
} & PropsWithChildren

export function WordTable(props: WordTableProps) {
  const className = cn([
    'grid grid-cols-3 lg:grid-cols-6 gap-1',
    props.validating && 'pointer-events-none',
    props.className
  ])

  return (
    <div className={className}>
      {props.children}
    </div>
  )
}