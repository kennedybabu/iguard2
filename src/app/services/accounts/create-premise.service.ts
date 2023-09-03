import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreatePremiseService {

  constructor(private http:HttpClient) { } 

  userObject!: any
  userId!: number 
  accountId!: number

  createPremise(formValue: any, accountId: number): Observable<any>{

    let jsonObject = {
      "requestObject": {
        "userId": this.userId,
        "account_id": accountId,
        "premise_category_id": formValue.category,
        "name": formValue.name,
        "location": formValue.location,
        "narration": formValue.narration
      },
      "requestService": "ADD_PREMISE_RULE"  
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }

}
