import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetPremiseDetailsService {

  constructor(private http:HttpClient) { }

  getPremiseInfo(id:any): Observable<any> {
    let jsonObject = {
      "requestObject":{
        "premiseId": id
        },
        "requestService":"PREMISEDETAILSRULE"
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
