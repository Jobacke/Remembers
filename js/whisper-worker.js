import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2';

// Disable local models, enable cache
env.allowLocalModels = false;
env.useBrowserCache = true;
// Force single thread to prevent Safari SharedArrayBuffer hangs
if (env.backends && env.backends.onnx && env.backends.onnx.wasm) {
    env.backends.onnx.wasm.numThreads = 1;
}

class MyTranscriptionPipeline {
    static task = 'automatic-speech-recognition';
    static model = 'Xenova/whisper-tiny';
    static instance = null;

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            this.instance = await pipeline(this.task, this.model, {
                progress_callback,
                quantized: true // v2 syntax for quantized models
            });
        }
        return this.instance;
    }
}

// Listen for messages from the main thread
self.addEventListener('message', async (event) => {
    const { audio, type } = event.data;

    if (type === 'transcribe') {
        try {
            postMessage({ status: 'init' });
            let transcriber = await MyTranscriptionPipeline.getInstance(x => {
                postMessage(x); // send progress updates
            });

            postMessage({ status: 'processing' });

            // Generate transcription
            let result = await transcriber(audio, {
                language: 'german',
                task: 'transcribe',
                chunk_length_s: 30, // Safe in v2
                stride_length_s: 5,
            });

            postMessage({
                status: 'complete',
                text: result.text
            });
        } catch (error) {
            postMessage({ status: 'error', error: error.message });
        }
    }
});
