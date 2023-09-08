import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreatePremiseAppointmentTagService {

  constructor(private http: HttpClient) { } 

  createTag(formValue: any, premiseId: number): Observable<any>{

    let jsonObject = {
      "requestObject": {
        "access": formValue.access,
        "description": formValue.description,
        "premise": premiseId      
      },
      "requestService": "CREATE_APPOINTMENT_TAG_RULE"  
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
