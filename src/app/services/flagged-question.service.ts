import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlaggedQuestionService {
  private flaggedQuestions: string[] = [];

  constructor() {}

  addFlaggedQuestion(question: string) {
    this.flaggedQuestions.push(question);
    // Here you can also send the question to your backend if needed
  }

  getFlaggedQuestions() {
    return this.flaggedQuestions;
  }
}