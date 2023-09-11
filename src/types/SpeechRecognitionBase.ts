import {SpeechRecognitionErrorEvent} from "./SpeechRecognitionErrorEvent";
import {SpeechRecognitionResultEvent} from "./SpeechRecognitionResultEvent";

export abstract class SpeechRecognitionBase extends EventTarget {
    continuous: boolean;
    protected _lang: string;
    interimResults: boolean;

    public onend: () => void;
    public onerror: (event: SpeechRecognitionErrorEvent) => void;
    public onresult: (event: SpeechRecognitionResultEvent) => void;


    abstract start(): void;
    abstract stop(): void;
    abstract abort(): void;


}