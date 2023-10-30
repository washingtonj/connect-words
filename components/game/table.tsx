"use client"

import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { useMedia } from "react-use";

type TableProps = {
  children: React.ReactElement[]
  validating?: boolean
  isExample?: boolean
}

export function Table(props: TableProps) {
  const isMobile = useMedia('screen and (max-width: 640px)', false);

  const childrensSplitedByColumn = useMemo(() => {
    const wordsPerColumn = (() => {
      if (props.isExample && isMobile) return 5
      if (props.isExample && !isMobile) return 3
      
      return 5
    })()

    const wordsSplited = []

    for (let i = 0; i < props.children.length; i += wordsPerColumn) {
      wordsSplited.push(props.children.slice(i, i + wordsPerColumn))
    }

    return wordsSplited
  }, [props.children, props.isExample, isMobile])

  return (
    <div className={cn([
      'grid grid-cols-3 lg:grid-cols-6 gap-1',
      props.isExample && 'lg:grid-cols-5',
      (props.validating || props.isExample) && 'pointer-events-none',
    ])}>

      {childrensSplitedByColumn.map((column, index) => (
        <div key={index} className="grid gap-1">
          {column.map((children) => children)}
        </div>
      ))}
    </div>
  )
}