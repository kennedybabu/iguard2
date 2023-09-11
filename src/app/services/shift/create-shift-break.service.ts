import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateShiftBreakService {

  constructor(private http:HttpClient) { }

  addBreak(formValue: any, shift_id: number): Observable<any>{   
    let jsonObject = {
      "requestObject": {    
        "name": formValue.name,
        "description": formValue.description,
        "staff_shift": shift_id
     
      },
      "requestService": "ADD_STAFF_SHIFT_BREAK_RULE"  
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
