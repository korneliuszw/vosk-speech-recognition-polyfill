import {SpeechRecognitionErrorCode} from "./SpeechRecognitionErrorCode";

export interface SpeechRecognitionErrorEvent {
    readonly error: SpeechRecognitionErrorCode
    readonly message: string
}

export class SpeechRecognitionError extends Error implements SpeechRecognitionErrorEvent {
    readonly error: SpeechRecognitionErrorCode;
    readonly message: string;

    constructor(error: SpeechRecognitionErrorCode, message: string) {
        super(message);
        this.error = error;
        this.message = message;
    }
}