import { Component, OnInit } from '@angular/core';

import quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  title:string=""

  questions: any
  questionSelected: any

  answers: string[] = []
  answerSelected: string = ""

  questionIndes:number = 0
  questionMaxIndes:number = 0

  finished: boolean = false

  finalNote = 0
  constructor() { }

  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndes]

      this.questionIndes = 0
      this.questionMaxIndes = this.questions.length
    }
  }

  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()
    if (value ==="A"){
      this.finalNote += 1
    }
    // console.log(value)
  }

  async nextStep(){
    this.questionIndes+=1
    if(this.questionMaxIndes> this.questionIndes){
      this.questionSelected = this.questions[this.questionIndes]
      // console.log(this.questionIndes)
    } else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
    }
  }

  async checkResult(answers:string[]){
   const result = answers.reduce((previous, current, i, arr) => {
     if (
      arr.filter(item => item === previous).length >
      arr.filter(item => item === current).length
      ) {
         return previous
      } else {
        return current
     }
   })

   return result
  }

  // somResult(value:string){
  //   if (value ==="A"){
  //     this.finalNote += 1
  //   }
  // };
}
