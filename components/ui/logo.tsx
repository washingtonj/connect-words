import Link from 'next/link'

export function Logo() {
  return (
    <span className='flex items-center justify-center'>
      <p className='text-3xl mr-2'>🕵🏽‍♂️</p>

      <Link href="/">
        <span className="w-fit text-center flex items-center mt-2 cursor-pointer">
          <h2 className="text-2xl font-bold mr-2">Brennas</h2>
          <h1 className="text-md font-medium self-center">Connect Words</h1>
        </span>
      </Link>
    </span>
  )
}