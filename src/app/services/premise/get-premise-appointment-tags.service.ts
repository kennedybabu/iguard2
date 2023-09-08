import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetPremiseAppointmentTagsService {

  constructor(private http:HttpClient) { }

  getTags(id: any): Observable<any> {
    let jsonObject = {
      "requestObject": {
        "premise": id
      },
      "requestService": "GET_ALL_PREMISE_APPOINTMENT_TAG_RULE"
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
