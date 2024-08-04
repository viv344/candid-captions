import React, { useState,useEffect,useRef } from 'react'
import Transcription from './Transcription'
import Translation from './Translation'

export default function Information(props) {

    const { output,finished } = props
    const [tab, setTab] = useState('transcription')
    const [translation, setTranslation] = useState(null)
    const [toLanguage, setToLanguage] = useState('Select language')
    const [translating, setTranslating] = useState(null)

    const worker=useRef()

    useEffect(() => {
        if (!worker.current) {
            worker.current = new Worker(new URL('../utils/translate.worker.js', import.meta.url), {
                type: 'module'
            })
        }

        const onMessageReceived = async (e) => {
            switch (e.data.status) {
                case 'initiate':
                    console.log('DOWNLOADING')
                    break;
                case 'progress':
                    console.log('LOADING')
                    break;
                case 'update':
                    setTranslation(e.data.output)
                    console.log(e.data.output)
                    break;
                case 'complete':
                    setTranslating(false)
                    console.log("DONE")
                    break;
            }
        }

        worker.current.addEventListener('message', onMessageReceived)

        return () => worker.current.removeEventListener('message', onMessageReceived)
    })

    const textElement = tab === 'transcription' ? output.map(val => val.text) : translation || ''


    function handleCopy() {
        navigator.clipboard.writeText(textElement)
    }

    function handleDownload() {
        const element = document.createElement("a")
        const file = new Blob([textElement], { type: 'text/plain' })
        element.href = URL.createObjectURL(file)
        element.download = `Candid-Captions_${new Date().toString()}.txt`
        document.body.appendChild(element)
        element.click()
    }
    function generateTranslation() {
        if (translating || toLanguage === 'Select language') {
            return
        }

        setTranslating(true)

        worker.current.postMessage({
            text: output.map(val => val.text),
            src_lang: 'eng_Latn',
            tgt_lang: toLanguage
        })

    }

    



    return (
        <main className='flex-1 p-4 flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center text-center pb-20 max-w-prose w-full mx-auto'>
            <h1 className='font-semibold text-3xl sm:text-4xl md:text-5xl text-rose-400 whitespace-nowrap'>
                Your <span className='text-cyan-400 bold'>Transcription</span>
            </h1>
            <div className='grid grid-cols-2 sm:mx-auto bg-white shadow rounded-full overflow-hidden items-center specialBtn '>
                <button onClick={() => setTab('transcription')} className={'px-4 duration-200 py-1 ' + (tab === 'transcription' ? ' bg-cyan-400 text-white' : ' text-rose-400 hover:text-cyan-400')}>Transcription</button>
                <button onClick={() => setTab('translation')} className={'px-4 duration-200 py-1  ' + (tab === 'translation' ? ' bg-rose-300 text-white' : ' text-cyan-400 hover:text-rose-400')}>Translation</button>
            </div>
            <div className='my-8 flex flex-col-reverse max-w-prose w-full mx-auto gap-4'>
                {(!finished || translating) && (
                    <div className='grid place-items-center'>
                        <i className="fa-solid fa-spinner animate-spin"></i>
                    </div>
                )}
                {tab === 'transcription' ? (
                    <Transcription {...props} textElement={textElement} />
                ) : (
                    <Translation {...props} textElement={textElement} toLanguage={toLanguage} translating={translating} translation={translation} setTranslating={setTranslating} setTranslation={setTranslation} setToLanguage={setToLanguage} generateTranslation={generateTranslation}/>
                )}
            </div>

            <div className='flex items-center gap-4 mx-auto text-base'>
                <button onClick={handleCopy} title='Copy' className='bg-white  hover:text-blue-500 duration-200 text-cyan-300 px-2 aspect-square grid place-items-center rounded'>
                    <i className="fa-solid fa-copy"></i>

                </button>
                <button onClick={handleDownload} title='Download' className='bg-white  hover:text-blue-500 duration-200 text-cyan-300 px-2 aspect-square grid place-items-center rounded'>
                    <i className="fa-solid fa-download"></i>

                </button>

            </div>
        </main>
    )
}
