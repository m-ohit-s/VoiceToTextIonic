import { Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { Platform } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-speech',
  templateUrl: './speech.page.html',
  styleUrls: ['./speech.page.scss'],
})
export class SpeechPage implements OnInit {
  text: any = '';
  header: any = 'Permission';
  isRecording = false;
  matches: any;
  constructor(private speechRecognition: SpeechRecognition, private plt: Platform, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  isIos() {
    return this.plt.is('ios');
  }

  getPermission(){
    this.speechRecognition.hasPermission().then((hasPermission: boolean)=>{
      if(!hasPermission){
        this.speechRecognition.requestPermission();
      }
      else if(hasPermission){
        this.text = 'Permission Granted';
      }
    });
  }

  startListening(){
    const options = {
      language: 'en-US'
    };
    this.header = 'Listening ...';
    this.speechRecognition.startListening().subscribe((matches=>{this.matches = matches; this.changeDetectorRef.detectChanges();}),
   (onerror)=>console.log('error: ', onerror));
    this.isRecording = true;
  }

  stopListening(){
    this.speechRecognition.stopListening().then(()=>{
      this.isRecording = false;
    });
  }
}
