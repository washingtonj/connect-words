import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<{
  variant?: 'primary' | 'neutral'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  disabled?: boolean
  inline?: boolean
  onClick?: () => void
}>

export function Button({
  size = 'md',
  variant = 'primary',
  inline = false,
  ...props
}: ButtonProps) {
  return (
    <button disabled={props.disabled} onClick={props.onClick} className={cn([
      'rounded-md text-sm bg-zinc-100 hover:bg-zinc-200 transition-colors duration-200',
      variant === 'primary' && 'text-white bg-zinc-900 hover:bg-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800',
      variant === 'neutral' && 'text-zinc-600 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700',
      size === 'sm' && 'px-4 py-2',
      size === 'md' && 'px-5 py-3',
      size === 'lg' && 'px-6 py-4',
      size === 'icon' && 'px-3 py-2',
      inline && 'w-full inline-block',
      'disabled:bg-zinc-200 disabled:text-zinc-400 disabled:hover:bg-zinc-200 disabled:hover:dark:bg-zinc-950 disabled:cursor-not-allowed'
    ])}>
      {props.children}
    </button>
  )
}