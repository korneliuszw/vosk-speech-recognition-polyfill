import {SpeechRecognitionResultList} from './SpeechRecognitionResultList'
export interface SpeechRecognitionResultEvent {
    /**
     * Index of first element changed in the SpeechRecognitionResultList
     */
    readonly resultIndex: number;
    readonly results: SpeechRecognitionResultList;
}