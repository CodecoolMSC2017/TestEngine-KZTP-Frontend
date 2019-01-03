import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TesteditService {

  constructor(private httpClient:HttpClient) { }

    editTest(id: number,path: String,questionId: number,newQuestionContent: String ,choiceId: number,newChoiceContent: String) {
      return this.httpClient.post<any>("/api/test/edited/test/" + id + "?path=" + path + "&questionId=" + questionId + "&newQuestionContent=" + newQuestionContent + "&choiceId=" + choiceId + "&newChoiceContent=" + newChoiceContent,null);
    }

    getTestToEdit(id: number) {
      return this.httpClient.get<any>("/api/test/edit/" + id);
    }

}
