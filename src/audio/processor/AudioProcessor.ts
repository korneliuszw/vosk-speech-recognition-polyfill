// Based on https://github.com/ccoreilly/vosk-browser/blob/master/examples/modern-vanilla/recognizer-processor.js
export interface AudioProcessorMessage {
    type: 'init'
    recognizerId?: number
}

export interface AudioProcessorOutgoingMessage {
    action: 'audioChunk',
    data: Float32Array,
    recognizerId: number
    sampleRate: number
}

class AudioProcessor extends AudioWorkletProcessor {

    private _recognizerId?: number;
    private _recognizerPort?: MessagePort;

    constructor(options) {
        super(options);
        this.port.onmessage = this._processMessage.bind(this)
    }

    private _processMessage(message: MessageEvent<AudioProcessorMessage>) {
        if (message.data.type === 'init') {
            this._recognizerId = message.data.recognizerId;
            this._recognizerPort = message.ports[0]
        }
    }

    public process(
        inputs: Float32Array[][],
        outputs: Float32Array[][],
        parameters: Record<string, Float32Array>
    ): boolean {
        const data = inputs[0][0]
        if (!this._recognizerPort && data) return true
        // AudioBuffer samples are represented as floating point numbers between -1.0 and 1.0 whilst
        // Kaldi expects them to be between -32768 and 32767 (the range of a signed int16)
        const audioArray = data.map(value => value * 0x800)
        const message: AudioProcessorOutgoingMessage = {
            action: 'audioChunk',
            data: audioArray,
            recognizerId: this._recognizerId,
            sampleRate // global scope of worklet
        }
        this._recognizerPort.postMessage(message, {transfer: [audioArray.buffer]})
        return true;
    }
}

registerProcessor('recognizer-processor', AudioProcessor)