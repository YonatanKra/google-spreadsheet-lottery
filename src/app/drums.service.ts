import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DrumsService {
  private audioCtx: AudioContext;
  private drumsBuffer: AudioBuffer;
  private source: AudioBufferSourceNode;

  constructor(private http: HttpClient) {
    (<any>window).AudioContext = (<any>window).AudioContext || (<any>window).webkitAudioContext;
    this.audioCtx = new AudioContext();
    this.http.get('assets/drums.mp3', {responseType: 'arraybuffer'})
      .subscribe((response) => {
        this.audioCtx.decodeAudioData(response, buffer => {
          this.drumsBuffer = buffer;
        });
      });
  }

  public startDrums() {
    this.playDrums();
  }

  public endDrums() {
    this.source.stop();
    this.playDrums(15);
  }

  private playDrums(offset = 0) {
    this.source = this.audioCtx.createBufferSource();
    this.source.buffer = this.drumsBuffer;
    this.source.connect(this.audioCtx.destination);
    this.source.start(0, offset);
  }
}
