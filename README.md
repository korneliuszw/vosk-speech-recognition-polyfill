# SpeechRecognition WebAPI polyfill

This is a polyfill for the [SpeechRecognition WebAPI](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) that uses vosk recognizer to perform speech recognition.
It was made with react-speech-recognition in mind.

This project is not stable yet, and is not ready for production use.
As for now, results are final and are returned after a sentence is finished.
No interimResults support. Continuous mode is default for now.

## Target requirements

[Audio Worklet](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorklet#browser_compatibility) support is required for this polyfill to work.

## Examples

Example app is located in `integration-tests/page` folder. It is a react app that uses react-speech-recognition and this polyfill to perform speech recognition.

## Testing

End-to-end tests are located in the `integration-tests/cypress` folder. They are still in development

## Docs

API docs are located in the `docs` folder.


## Building
```bash
npm run build
```