import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetPremiseAppointmentsService {

  currentDate!: Date
  formattedTime!: any
  updatedDateString!: any

  constructor(
    private http:HttpClient,
    private datePipe: DatePipe) {
      this.currentDate = new Date()
      this.formattedTime = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd') 
  
      const date = new Date(this.formattedTime);
      date.setDate(date.getDate() + 1);
  
      this.updatedDateString = date.toISOString().split("T")[0];
    }

    getPremiseAppointments(id:any): Observable<any> {
   
      let jsonObject = {
        "requestObject":{
          "premise": id,
          "date": this.updatedDateString
          },
          "requestService":"GET_APPOINTMENT_BY_PREMISE"
        }
      return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
    }


    getTimedPremiseAppointments(id:any, date: any): Observable<any> {
      const startDate = new Date(date)
  
      const startYear = startDate.getFullYear()
  
      const startMonth = ("0" + (date.getMonth() + 1)).slice(-2)
  
      const startDay = ("0" + date.getDate()).slice(-2)
  
  
      const formattedStartDate = `${startYear}-${startMonth}-${startDay}`
      let jsonObject = {
        "requestObject":{
          "premise": id,
          "date": formattedStartDate
          },
          "requestService":"GET_APPOINTMENT_BY_PREMISE"
      }
      return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
    }

  
}
