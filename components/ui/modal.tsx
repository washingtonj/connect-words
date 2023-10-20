"use client"

import { PropsWithChildren, useRef } from "react";
import { useClickAway } from "react-use";
import { Button } from ".";

type ModalProps = PropsWithChildren<{
  isOpen: boolean;
  title: string;
  actions?: React.ReactNode;
  onClose?: () => void;
}>

export function Modal(props: ModalProps) {
  const ref = useRef(null)

  useClickAway(ref, () => {
    if (props.onClose) props.onClose()
  })

  return props.isOpen ? (
    <div className="w-screen h-screen fixed left-0 top-0 z-30 bg-black/70 transition-all">
      <div className="h-full flex flex-col items-center justify-end lg:justify-center">

        <div ref={ref} className="flex flex-col gap-6 w-full lg:w-4/12 lg:-mt-44 rounded-lg p-4 bg-white dark:bg-zinc-900">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-lg font-bold">{props.title}</h2>
            <Button onClick={props.onClose} size="icon" variant="neutral">X</Button>
          </div>

          {props.children}

          {props.actions && (
            <div className="mt-2">
              {props.actions}
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null
}