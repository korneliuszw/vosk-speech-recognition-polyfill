import {SpeechRecognitionErrorEvent} from "./SpeechRecognitionErrorEvent";
import {SpeechRecognitionResultEvent} from "./SpeechRecognitionResultEvent";

export abstract class SpeechRecognitionBase {
    continuous: boolean;
    protected _lang: string;
    interimResults: boolean;

    public onend: (event: Event) => void;
    public onerror: (event: SpeechRecognitionErrorEvent) => void;
    public onresult: (event: SpeechRecognitionResultEvent) => void;


    abstract start(): void;
    abstract stop(): void;
    abstract abort(): void;


}