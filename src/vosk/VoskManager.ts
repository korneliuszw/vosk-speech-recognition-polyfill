import {createModel} from "vosk-browser";
import type {Model, KaldiRecognizer} from 'vosk-browser'
import {AudioSource} from "../audio/AudioSource";

export const SAMPLE_RATE = 44000

export class VoskManager {
    private _model: Model
    private _recognizer: KaldiRecognizer
    private _audioSource: AudioSource

    private async initManager(modelUrl: string) {
        this._model = await createModel(modelUrl)
        this._recognizer = new this._model.KaldiRecognizer(SAMPLE_RATE)
        this._recognizer.setWords(true)
    }

    public static async init(modelUrl: string) {
        const manager = new VoskManager()
        await manager.initManager(modelUrl)
        return manager
    }

    public stop() {
        return this._audioSource?.stop()
    }

    public async start() {
        const channel = new MessageChannel()
        this._model.registerPort(channel.port1) // Will this clean port?
        this._audioSource =  await AudioSource.init(this._recognizer, channel)
    }

    public async close() {
        await this._audioSource?.stop()
        this._model.terminate()
    }


}