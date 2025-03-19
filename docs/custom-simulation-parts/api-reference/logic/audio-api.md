---
sidebar_position: 6
---

# Audio API

The Audio API enables simulation components to play audio directly on the user's computer within the simulation environment. Components can generate and play audio using two primary methods: frequency-based audio or sample-based audio.

This API allows you to:

- **Play audio by specifying a frequency** (produces clean, high-quality audio tones).
- **Play audio by sending audio sample buffers** (provides detailed audio playback with some potential quality trade-offs).

---

## API Methods Reference & Examples

### sendAudioFrequencyUpdate(frequency: number): void

Plays audio at a specific frequency, ideal for clean, precise audio tones like buzzers or simple tone generators.

- **frequency** *(number)*: Frequency of the audio tone in Hertz (Hz).

```typescript
// Play a 440 Hz audio tone (A4 note)
this.simulationAPI.audio.sendAudioFrequencyUpdate(440);
```

---

### sendAudioBuffer(sampleRate: number, samples: Float32Array): void

Plays audio by providing an audio sample buffer. Suitable for complex or detailed audio signals such as waveforms or recorded audio playback. Audio quality may vary depending on sample resolution and playback conditions.

- **sampleRate** *(number)*: Sample rate of the audio buffer in samples per second (Hz).
- **samples** *(Float32Array)*: Array of audio samples, each ranging from `-1.0` (full negative amplitude) to `1.0` (full positive amplitude).

```typescript
// Create a sine wave audio buffer
const sampleRate = 44100; // Standard audio sample rate (44.1kHz)
const durationSeconds = 1;
const frequency = 440;
const samples = new Float32Array(sampleRate * durationSeconds);

for (let i = 0; i < samples.length; i++) {
  samples[i] = Math.sin(2 * Math.PI * frequency * (i / sampleRate));
}

// Play the audio buffer
this.simulationAPI.audio.sendAudioBuffer(sampleRate, samples);
```

---

## Usage Recommendations

- Use `sendAudioFrequencyUpdate` for high-quality, simple tones.
- Use `sendAudioBuffer` for detailed audio playback requiring precise waveform control or complex audio signals.

