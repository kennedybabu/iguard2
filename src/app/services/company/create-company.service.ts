import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CreateCompanyService {

  user!: any

  constructor(private http:HttpClient,
    private authService:AuthService
  ) {
    this.authService.userData$.subscribe((res) => {
      this.user = res
    })
   } 

  createCompany(formValue:any, premiseId: number): Observable<any> {

    let jsonObject = {
      "requestObject": {
        "name": formValue.name,
        "description": formValue.description,
        "premise": premiseId,
        "created_by": this.user?.user_id
      },
      "requestService": "CREATE_ACCOUNT_COMPANY_RULE"
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
