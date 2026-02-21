import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.3.0';

// Disable sending telemetry
env.allowLocalModels = false;
env.useBrowserCache = true;

// Create a class to manage pipeline loading
class MyTranscriptionPipeline {
    static task = 'automatic-speech-recognition';
    static model = 'Xenova/whisper-tiny';
    static instance = null;

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            // Force quantization and WASM explicit config to prevent hanging on Safari
            this.instance = await pipeline(this.task, this.model, {
                progress_callback,
                device: 'wasm',
                dtype: 'q8' // Enforce q8 quantized globally to prevent OOM/compile hangs
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

            // Generate transcription without forcing chunk_length which can cause infinite loops
            let result = await transcriber(audio, {
                language: 'german',
                task: 'transcribe',
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
