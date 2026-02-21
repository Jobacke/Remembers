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
            // Attempt to instantiate the pipeline, opting into WebGPU if available, falling back to WASM
            this.instance = await pipeline(this.task, this.model, {
                progress_callback,
                device: 'webgpu', // Try WebGPU first for 10x speedup
                dtype: {
                    encoder_model: 'fp32', // fp32 has better accuracy
                    decoder_model_merged: 'q8', // q8 exists for Xenova models ('q4' does not and hangs)
                }
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
            // Load the model
            postMessage({ status: 'loading' });
            let transcriber = await MyTranscriptionPipeline.getInstance(x => {
                postMessage(x); // send progress updates
            });

            postMessage({ status: 'processing' });

            // Generate transcription
            let result = await transcriber(audio, {
                language: 'german',
                task: 'transcribe',
                chunk_length_s: 30,
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
