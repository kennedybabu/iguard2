import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class GetPremiseLeaveRequestsService {

  constructor(private http:HttpClient) { }

  getDetails(time:any, premiseId: any): Observable<any> {

    const currentTime = new Date(time)


    const startDate = new Date(currentTime.getTime() - 1 * 24 * 60 * 60 * 1000)
    const startYear = startDate.getFullYear()
    const startMonth = String(startDate.getMonth() + 1).padStart(2, '0')
    const startDay = String(startDate.getDate()).padStart(2, '0')

    const formattedStartDate = `${startYear}-${startMonth}-${startDay}`

    //add a day to get future day leave requests 

    const timeDay = new Date(time)
    timeDay.setDate(timeDay.getDate() + 1)

    const newEndDate = timeDay.toISOString().split('T')[0]

    let jsonObject = {
      "requestObject": {
        "premise": premiseId,
        "dateFrom": formattedStartDate,
        "dateTo": newEndDate
      },
      "requestService": "GET_LEAVE_REQUEST_BY_PREMISE"
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }

  getTimedDetails(formvalue:any, premiseId: any): Observable<any> {
    let start = formvalue.dateFrom 
    let end = formvalue.dateTo

    const startDate = new Date(start)
    const endDate = new Date(end)

    const startYear = startDate.getFullYear()
    const endYear = endDate.getFullYear()

    const startMonth = ("0" + (start.getMonth() + 1)).slice(-2)
    const endMonth = ("0" + (end.getMonth() + 1)).slice(-2)

    const startDay = ("0" + start.getDate()).slice(-2)
    const endDay = ("0" + end.getDate()).slice(-2)


    const formattedStartDate = `${startYear}-${startMonth}-${startDay}`
    const formattedEndDate = `${endYear}-${endMonth}-${endDay} `


    let jsonObject = {
      "requestObject": {
        "premise": premiseId,
        "dateFrom": formattedStartDate,
        "dateTo": formattedEndDate
      },
      "requestService": "GET_LEAVE_REQUEST_BY_PREMISE"
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
