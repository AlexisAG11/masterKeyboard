import { Component, OnInit } from '@angular/core';
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
  

  constructor(private http: HttpClient){}

  SendAPI(){
    // this.isLoading = true;
    //  this.http.get(environment.apiUrl).subscribe(res => {
    //   this.isLoading = false;
    //   this.responseData = res;
    //   this.easyWord = this.responseData.data.easy;
    //   this.mediumWord = this.responseData.data.medium;
    //   this.difficultWord = this.responseData.data.difficult;
    //   console.log(this.easyWord);
    //   console.log(this.mediumWord );
    //   console.log(this.difficultWord);
    //   this.combinedArray = this.easyWord.concat(this.mediumWord, this.difficultWord);
    //   console.log(this.combinedArray);
    // },
    // error => {
    //   console.log(error)
    //   this.isError = true;
    //   this.errorMsg = error.error.msg;
    //   setTimeout(() => {
    //     this.isError = false;
    //   }, 2000)
    // })
  }


  isCorrect = false;
  isUncorrect = false;
  counterWord = 0;

  checkWord(){
    if(this.userInput === this.combinedArray[this.indexWord]){
      // good so next word
      this.isCorrect=true;
      this.counterWord++;
      console.log("well done");
      this.userInput = "";
      if (this.indexWord===30) {
        return
      }
      this.indexWord++;
      setTimeout(() => {
        this.isCorrect = false;
      }, 500);
      
    }
    else {
      this.isUncorrect = true;
      this.userInput = "";
      console.log("you miss");
      setTimeout(() => {
        this.isUncorrect = false;
      }, 500);
    }
  }


  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  private timerSubscription!: Subscription;

  startTimer(): void {
    this.timerSubscription = interval(10).subscribe(() => {
      this.milliseconds += 10;
      if (this.milliseconds >= 1000) {
        this.milliseconds = 0;
        this.seconds++;
      }
      if (this.seconds >= 60) {
        this.seconds = 0;
        this.minutes++;
      }
    });
  }

  stopTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  resetTimer(): void {
    this.stopTimer();
    this.milliseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
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


  ngOnInit(): void {
    // TO NOT CALL THE API FOR DEV PURPOSE

    this.combinedArray = ['cat', 'dog', 'sun', 'book', 'tree', 'car', 'fish', 'star', 'hat', 'cup', 'apple', 'bridge', 'guitar', 'flower', 'bicycle', 'friend', 'window', 'pencil', 'otter', 'mountain', 'acquiesce', 'quintessential', 'ephemeral', 'infrastructure', 'juxtaposition', 'onomatopoeia', 'extrapolate', 'philosophical', 'superfluous', 'ubiquitous'];
  }



}
