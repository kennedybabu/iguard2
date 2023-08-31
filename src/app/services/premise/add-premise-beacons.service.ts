import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddPremiseBeaconsService {

  constructor(private http:HttpClient) { }

  createBeacon(formValue:any, premiseId: number): Observable<any> {

    let jsonObject = {
      "requestObject": {
        "longitude": '',
        "signature": formValue.signature,
        "premiseId": premiseId,
        "latitude": '',
        "description": formValue.description
      },
      "requestService": "BEACON_CREATION_RULE"
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
