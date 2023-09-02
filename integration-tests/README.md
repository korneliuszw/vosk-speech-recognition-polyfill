# Test scope

This polyfill is designed with react-speech-recognition in mind, but it should work with any speech recognition library that uses the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API).

Those tests will use the aforementioned library to test the polyfill in a real browser environment.

Unit tests for the polyfill aren't available as mocking the MediaStream API is not worth it.
