import type {KaldiRecognizer, Model} from 'vosk-browser'
import {createModel} from "vosk-browser";
import {AudioSource, SAMPLE_RATE} from "../audio/AudioSource";
import {ServerMessageError, ServerMessageResult} from "vosk-browser/dist/interfaces";
import {SpeechRecognitionError} from "../types/SpeechRecognitionErrorEvent";
import {SpeechRecognitionErrorCode} from "../types/SpeechRecognitionErrorCode";
import {SpeechRecognitionResultList} from "../types/SpeechRecognitionResultList";


export class VoskManager {
    private _model: Model
    private _recognizer: KaldiRecognizer
    private _audioSource: AudioSource
    public _onerror: (error: SpeechRecognitionError) => void
    public _onresult: (result: SpeechRecognitionResultList) => void
    public _onend: () => void

    private async initManager(modelUrl: string) {
        try {
            this._model = await createModel(modelUrl)
            this._recognizer = new this._model.KaldiRecognizer(SAMPLE_RATE)
            this._recognizer.setWords(true)
            this._recognizer.on('result', this.onResult.bind(this))
            this._recognizer.on('error', this.onError.bind(this))
        } catch (e) {
            this._onerror(new SpeechRecognitionError(SpeechRecognitionErrorCode['network'], e.message))
        }
    }

    public static async init(modelUrl: string) {
        const manager = new VoskManager()
        await manager.initManager(modelUrl)
        return manager
    }

    public stop() {
        return this._audioSource?.stop().then(() => this._onend())
    }

    public async start() {
        const channel = new MessageChannel()
        this._model.registerPort(channel.port1) // Will this clean port?
        this._audioSource =  await AudioSource.init(this._recognizer, channel)
    }

    public async close() {
        await this._audioSource?.stop()
        this._model.terminate()
        this._onend()
    }

    onResult(message: ServerMessageResult) {
        if (!message.result?.result) return
        const results: SpeechRecognitionResultList = {
            length: message.result.result.length,
            ...(message.result.result.map(s => {
                return {
                    length: 1,
                    0: {
                        transcript: s.word,
                        confidence: s.conf
                    }
                }
            }))
        }
        this._onresult(results)
    }

    onError(message: ServerMessageError) {
        this._onerror(new SpeechRecognitionError(SpeechRecognitionErrorCode['bad-grammar'], message.error))
    }
}