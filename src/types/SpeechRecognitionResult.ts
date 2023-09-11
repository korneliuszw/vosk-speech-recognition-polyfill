import {SpeechRecognitionAlternative} from './SpeechRecognitionAlternative';
export interface SpeechRecognitionResult {
    readonly isFinal: boolean;
    readonly length: number;
    [index: number]: SpeechRecognitionAlternative;
}