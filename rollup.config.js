import typescript from "rollup-plugin-typescript2"
import nodeResolve from "@rollup/plugin-node-resolve"
import webWorkerLoader from 'rollup-plugin-web-worker-loader'
import typescriptModule from 'typescript'
import commonjs from "@rollup/plugin-commonjs";

export default [
    {
        input: 'src/index.ts',
        output: {
            name: 'vosk-speech-recognition-polyfill',
            dir: 'dist',
            format: 'esm',
            sourcemap: true
        },
        plugins: [
            webWorkerLoader({
                targetPlatform: 'browser',
                inline: true
            }),
            typescript({
                typescript: typescriptModule,
                clean: true
            }),
            commonjs(),
            nodeResolve({extensions: ['.js', '.ts'], browser: true})
        ]
    }
]