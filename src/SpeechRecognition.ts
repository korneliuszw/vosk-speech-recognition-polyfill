import {SpeechRecognitionBase} from "./types/SpeechRecognitionBase";
import {SpeechRecognitionError} from "./types/SpeechRecognitionErrorEvent";
import {SpeechRecognitionErrorCode} from "./types/SpeechRecognitionErrorCode";

export class SpeechRecognition extends SpeechRecognitionBase {

    private static languageModels: Record<string, string>

    /**
     * @param language
     * @param modelUrl path to model's gzip tar archive relative to a base url of the app
     */
    static addLanguage(language: string, modelUrl: string) {
        SpeechRecognition.languageModels[language] = modelUrl
    }

    public set lang(language: string) {
        if (!(language in SpeechRecognition.languageModels)) {
            this.onerror(new SpeechRecognitionError(SpeechRecognitionErrorCode['language-not-supported'], `Language ${language} is not supported`))
        }
        this._lang = language
    }
    public get lang(): string {
        return this._lang
    }

    abort(): void {
    }

    start(): void {
    }

    stop(): void {
    }

}