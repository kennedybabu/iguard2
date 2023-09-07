import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDepartmentDesignationsService {

  constructor(private http:HttpClient) { } 

  getDesignations(id: any): Observable<any> {
    let jsonObject = {
      "requestObject": {
        "department": id
      },
      "requestService": "GET_ALL_COMPANY_DESIGNATION_BY_DEPARTMENT"
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
