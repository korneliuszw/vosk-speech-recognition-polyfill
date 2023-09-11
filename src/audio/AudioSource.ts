import {KaldiRecognizer} from "vosk-browser";
import registerAudioProcessor from 'audio-worklet:./processor/AudioProcessor.ts'
export const SAMPLE_RATE = 44100

export class AudioSource {
    private _mediaStream: MediaStream
    private _audioContext: AudioContext
    private _recognizerNode: AudioWorkletNode
    private async initAudio(recognizer: KaldiRecognizer, channel: MessageChannel) {
        this._mediaStream = await navigator.mediaDevices.getUserMedia({audio: {
                sampleRate: SAMPLE_RATE,
                echoCancellation: true,
                noiseSuppression: true,
                channelCount: 1
            }, video: false})
        this._audioContext = new AudioContext()
        await registerAudioProcessor(this._audioContext)
        this._recognizerNode = new AudioWorkletNode(this._audioContext, 'recognizer-processor', { channelCount: 1, numberOfInputs: 1, numberOfOutputs: 1 })
        this._recognizerNode.port.postMessage({type: 'init', recognizerId: recognizer.id}, [channel.port2])
        this._recognizerNode.connect(this._audioContext.destination)
        const source = this._audioContext.createMediaStreamSource(this._mediaStream)
        source.connect(this._recognizerNode)
    }

    static async init(recognizer: KaldiRecognizer, channel: MessageChannel): Promise<AudioSource> {
        const audioSource = new AudioSource()
        await audioSource.initAudio(recognizer, channel)
        return audioSource
    }

    public async stop() {
        this._recognizerNode.disconnect()
        await this._audioContext.close()
        this._mediaStream.getTracks().forEach(track => track.stop())
    }

}