export class AudioAnalyzer {
  constructor(audioContext, source, fftSize = 2048) {
    this.audioContext = audioContext;
    this.source = source;
    this.analyser = audioContext.createAnalyser();
    this.analyser.fftSize = fftSize;
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.source.connect(this.analyser);
  }

  getFrequencyData() {
    this.analyser.getByteFrequencyData(this.dataArray);
    return this.dataArray;
  }

  getAverageLevel() {
    const data = this.getFrequencyData();
    return data.reduce((a, b) => a + b, 0) / data.length / 255;
  }
}