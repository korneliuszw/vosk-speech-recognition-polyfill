declare module 'audio-worklet:*' {
    export default function registerAudioWorklet(audioContext: AudioContext): Promise<void>;
}