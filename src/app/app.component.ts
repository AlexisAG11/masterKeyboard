import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


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
  checkWord(){
    if(this.userInput === this.combinedArray[this.indexWord]){
      // good so next word
      this.isCorrect=true;
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

  ngOnInit(): void {
    // TO NOT CALL THE API FOR DEV PURPOSE

    this.combinedArray = ['cat', 'dog', 'sun', 'book', 'tree', 'car', 'fish', 'star', 'hat', 'cup', 'apple', 'bridge', 'guitar', 'flower', 'bicycle', 'friend', 'window', 'pencil', 'otter', 'mountain', 'acquiesce', 'quintessential', 'ephemeral', 'infrastructure', 'juxtaposition', 'onomatopoeia', 'extrapolate', 'philosophical', 'superfluous', 'ubiquitous'];
  }

}
