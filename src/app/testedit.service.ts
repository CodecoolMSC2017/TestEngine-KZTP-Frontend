import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from './question';

@Injectable({
  providedIn: 'root'
})
export class TesteditService {

  constructor(private httpClient:HttpClient) { }

    /* editTest(id: number,path: String,questionId: number,newQuestionContent: String ,choiceId: number,newChoiceContent: String) {
      return this.httpClient.post<any>("/api/test/edited/test/" + id + "?path=" + path + "&questionId=" + questionId + "&newQuestionContent=" + newQuestionContent + "&choiceId=" + choiceId + "&newChoiceContent=" + newChoiceContent,null);
    } */

    editTest(id:number,questions: Question[]) {
      return this.httpClient.post<any>("/api/test/edited/" + id,questions);
    }

    getTestToEdit(id: number) {
      return this.httpClient.get<any>("/api/test/edit/" + id);
    }

}
