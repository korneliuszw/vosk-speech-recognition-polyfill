import {SpeechRecognitionBase} from "./types/SpeechRecognitionBase";
import {SpeechRecognitionError} from "./types/SpeechRecognitionErrorEvent";
import {SpeechRecognitionErrorCode} from "./types/SpeechRecognitionErrorCode";
import {VoskManager} from "./vosk/VoskManager";
import {ObserverableValue, Observers} from "./types/Observer";

export class SpeechRecognition extends SpeechRecognitionBase {

    private static languageModels: Record<string, string> = {}
    private static _isReady: ObserverableValue<boolean> = new ObserverableValue<boolean>()
    private voskManager: VoskManager = new VoskManager()

    /**
     * Notifies when VoskManager is ready to start recognition, i.e. when model is loaded
     */
    public static get isReady(): Omit<Observers<boolean>, 'notify'> {
        return this._isReady.observers
    }
    /**
     * Adds language to the list of supported languages
     * @param language
     * @param modelUrl path to model's gzip tar archive
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
                console.log(this.voskManager)
                this.voskManager = manager
                this.voskManager._onerror = (error) => this.onerror(error)
                this.voskManager._onend = () => this.onend()
                this.voskManager._onresult = (results) => this.onresult({resultIndex: 0, results})
                SpeechRecognition._isReady.notify(true)
            })
    }

    public get lang(): string {
        return this._lang
    }

    abort(): void {
        this.voskManager?.close()
    }

    start(): void {
        const callback = (isReady: boolean) => {
            if (!isReady) return
            this.voskManager.start()
            SpeechRecognition.isReady.unsubscribe(callback)
        }
        SpeechRecognition.isReady.subscribe(callback)
    }

    stop(): void {
        this.voskManager?.stop().then(() => console.debug('stop'))
    }

}