import React from 'react'

export default function Header() {
  return (
    <header className='flex items-center justify-between gap-4 p-4'>
          <a href='/'><h1 className='font-medium text-rose-400'>Candid<span className='text-cyan-400 bold'>Captions</span></h1></a>
          <a href='/' className='flex items-center gap-2 specialBtn px-3 text-sm py-2 rounded-lg text-cyan-400'>
            <p>New</p>
            <i className="fa-solid fa-plus"></i>
          </a>

    </header>
  )
}
