import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetShiftBreaksService {

  constructor(private http:HttpClient) { }

  getBreaks(shiftId: number): Observable<any> {
    let jsonObject = {
      "requestObject": {
        "staff_shift": shiftId
      },
    "requestService": "GET_ALL_BREAK_STAFF_SHIFT"
  }
  return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
}
}
