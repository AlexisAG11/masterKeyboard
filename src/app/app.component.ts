import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'master-keyboard';
  errorMsg: string = "";
  isLoading: boolean = false;
  isError : boolean = false;
  easyWord: string[] = [];
  mediumWord: string[] = [];
  difficultWord: string[] = [];
  combinedArray: string[] = [];
  responseData:any;
  indexWord = 0;
  userInput = "";

  @ViewChild('targetInput') target: any;

  isCorrect = false;
  isUncorrect = false;
  counterWord = 1;
  finish = false;
  
  
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  private timerId: any;         // Timer reference
  private isRunning: boolean = false;  // Timer running flag

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef){}

  SendAPI(){
    this.resetTimer();
    this.isLoading = true;
    this.combinedArray = [];
    this.counterWord = 1;
    this.indexWord = 0;
    this.milliseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
     this.http.get(environment.apiUrl).subscribe(res => {
      this.finish = false; // when reloading the data
      this.isLoading = false;
      this.responseData = res;
      this.combinedArray = this.responseData.data.words;
      this.combinedArray = this.combinedArray.length > 30 ? this.combinedArray.slice(0, 30) : this.combinedArray;
      this.combinedArray.push('🎉');
      this.cdr.detectChanges();
      this.target.nativeElement.focus();
    },
    error => {
      console.log(error)
      this.isError = true;
      this.errorMsg = error.error.msg;
      setTimeout(() => {
        this.isError = false;
      }, 2000)
    })
  }

  checkWord(){
    if(this.userInput === this.combinedArray[this.indexWord]){
      // good so next word

      this.indexWord++;
      if (this.indexWord===30) {
        this.finish = true;
        this.userInput = "";
        this.stopTimer();
        return
      }
      this.isCorrect=true;
      this.counterWord++;
      this.userInput = "";
      setTimeout(() => {
        this.isCorrect = false;
      }, 500);
      
    }
    else {
      this.isUncorrect = true;
      this.userInput = "";
      setTimeout(() => {
        this.isUncorrect = false;
      }, 500);
    }
  }

  startTimer() {
    // Prevent multiple intervals from being set
    if (this.isRunning) return;

    this.isRunning = true;

    // Start the timer
    this.timerId = setInterval(() => {
      this.milliseconds += 10;
      if (this.milliseconds >= 1000) {
        this.milliseconds = 0;
        this.seconds++;
      }
      if (this.seconds >= 60) {
        this.seconds = 0;
        this.minutes++;
      }
      if (this.minutes===5) {
        this.stopTimer();
      }
    }, 10);  // Increment every second (1000ms)
  }

  stopTimer() {
    // Stop the timer
    if (this.timerId) {
      clearInterval(this.timerId);
      this.isRunning = false;
    }
  }

  resetTimer() {
    // Reset the timer to 0 and stop it
    this.seconds = 0;
    this.milliseconds = 0;
    this.minutes = 0;
    this.stopTimer();
  }

  formatTime(value: number): string {
    // Format time to have 2 digits (e.g., 09 instead of 9)
    return value < 10 ? '0' + value : value.toString();
  }
  formatTimeMili(value: number): string {
    // Format time to have 2 digits (e.g., 09 instead of 9)
    let val = value === 0 ? "00" : value < 100 ? "0" + value.toString().slice(0, -1) : value.toString().slice(0, -1);
    return val
  }

  onInput(e:Event) : void{
    const input = e.target as HTMLInputElement;
    if (input.value.length === 1 && this.counterWord === 1) {
      this.startTimer();
    }
  }


  ngOnInit(): void {
    this.SendAPI();
  }



}
