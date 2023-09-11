import {SpeechRecognitionResult}  from "./SpeechRecognitionResult";

export interface SpeechRecognitionResultList {
    readonly length: number;
    [index: number]: SpeechRecognitionResult;
}