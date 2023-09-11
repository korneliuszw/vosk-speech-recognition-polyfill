import 'regenerator-runtime/runtime'
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import {SpeechRecognition as VoskSpeechRecognition} from 'vosk-speech-recognition-polyfill'
import {useEffect, useState} from "react";
import polishModel from './polish.tar.gz?url'

console.log(polishModel)

VoskSpeechRecognition.addLanguage('pl', polishModel)

export const App = () => {
    const [isReady, setIsReady] = useState(VoskSpeechRecognition.isReady.value)
    useEffect(() => {
        VoskSpeechRecognition.isReady.subscribe((isReady) => {
            console.log('isReady', isReady)
            setIsReady(isReady)
        })
        SpeechRecognition.applyPolyfill(VoskSpeechRecognition)
    }, [])
    const {transcript} = useSpeechRecognition()

    return <main>
        <h1>Hello world!</h1>
        <div>Model status: <span data-testid={'status'}>{isReady ? 'ready': 'loading'}</span></div>
        <button data-testid={'startRecognition'} onClick={() => SpeechRecognition.startListening({
            language: 'pl',
            continuous: true
        })}>Start</button>
        <button data-testid={'stopRecognition'} onClick={() => SpeechRecognition.stopListening()}>Stop</button>
        <div>Your words: </div>
        <div data-testid={'transcript'}>
            {transcript}
        </div>
    </main>
}