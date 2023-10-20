import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/">
      <div className='flex gap-3'>
        <p className='text-4xl'>🕵🏽‍♂️</p>

        <span className="flex flex-col items-start">
          <h2 className="text-2xl font-bold">Brenna&apos;s</h2>
          <h1 className="text-md font-extralight -mt-2.5">Connect Words</h1>
        </span>
      </div>
    </Link>
  )
}