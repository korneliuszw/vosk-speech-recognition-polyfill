import {SpeechRecognitionErrorEvent} from "./SpeechRecognitionErrorEvent";
import {SpeechRecognitionResultEvent} from "./SpeechRecognitionResultEvent";

export abstract class SpeechRecognitionBase extends EventTarget {
    /**
     * Keep recognizing after the results are returned
     * @experimental not yet implemented
     * @default true
     */
    continuous: boolean;
    protected _lang: string;
    /**
     * Return temporary result
     * @experimental not yet implemented
     */
    interimResults: boolean;

    public onend: () => void;
    public onerror: (event: SpeechRecognitionErrorEvent) => void;
    public onresult: (event: SpeechRecognitionResultEvent) => void;


    abstract start(): void;
    abstract stop(): void;
    abstract abort(): void;


}