import React, { useRef, useEffect } from 'react'

export default function FileDisplay(props) {
  const {handleAudioReset, file, audioStream,handleFormSubmission}=props
  return (
    <main className='flex-1 p-4 flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center text-center pb-20 w-fit max-w-full mx-auto'>
        <h1 className=' font-semibold text-4xl sm:text-5xl md:text-6xl text-rose-400'>
            Your <span className='text-cyan-400 bold'>File</span>
        </h1>
        <div className='mx-auto flex flex-col text-left my-4'>
            <h3 className='font-semibold'>Name</h3>
            <p>{file ? file?.name:'Custom Audio'}</p>
        </div>

        <div className='flex items-center justify-between gap-4'>
            <button onClick={handleAudioReset} className='text-slate-400 hover:text-cyan-600 duration-200'>Reset</button>
            <button onClick={handleFormSubmission} className='specialBtn px-3 py-2 rounded-lg text-blue-400 flex items-center gap-2.5 font-medium'>
                <p>Transcribe</p>
                <i className="fa-solid fa-pencil"></i>
            </button>

        </div>
    </main>

  )
}
