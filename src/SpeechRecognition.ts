import {SpeechRecognitionBase} from "./types/SpeechRecognitionBase";
import {SpeechRecognitionError} from "./types/SpeechRecognitionErrorEvent";
import {SpeechRecognitionErrorCode} from "./types/SpeechRecognitionErrorCode";
import {VoskManager} from "./vosk/VoskManager";
import {ObserverableValue, Observers} from "./types/Observer";

export class SpeechRecognition extends SpeechRecognitionBase {

    private static languageModels: Record<string, string>
    private static _isReady: ObserverableValue<boolean> = new ObserverableValue<boolean>()
    private voskManager: VoskManager = new VoskManager()

    public static get isReady(): Omit<Observers<boolean>, 'notify'> {
        return this._isReady.observers
    }
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
        VoskManager.init(SpeechRecognition.languageModels[language])
            .then((manager) => {
                SpeechRecognition._isReady.notify(true)
                this.voskManager = manager
            })
    }

    public get lang(): string {
        return this._lang
    }

    abort(): void {
        this.voskManager.close().then(() => console.debug('abort'))
    }

    start(): void {
        this.voskManager.start().then(() => console.debug('start'))
    }

    stop(): void {
        this.voskManager.stop().then(() => console.debug('stop'))
    }

}