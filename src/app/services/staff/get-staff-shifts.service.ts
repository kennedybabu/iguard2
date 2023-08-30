import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetStaffShiftsService {

  constructor(private http:HttpClient) { }


  getTimedDetails(staffId: number, startDate: any, endDate:any): Observable<any> { 
    const start = startDate
    const end = endDate

    const startTime = new Date(start)
    const endTime = new Date(end)


    const startTimeYear = startTime.getFullYear()
    const startTimeMonth = String(startTime.getMonth() + 1).padStart(2, '0') 
    const startTimeDay = String(startTime.getDate()).padStart(2, '0')

    const endTimeYear = endTime.getFullYear()
    const endTimeMonth = String(endTime.getMonth() + 1).padStart(2, '0')
    const endTimeDay = String(endTime.getDate())


    const formattedStartTime = `${startTimeYear}-${startTimeMonth}-${startTimeDay}`
    const formattedEndTime = `${endTimeYear}-${endTimeMonth}-${endTimeDay}`   

    let jsonObject = {
      "requestObject":{
        "staff": staffId,
        "start": formattedStartTime,
        "end": formattedEndTime
        },
        "requestService":"GET_STAFF_SHIFT_DETAILS"
    }
    console.log(jsonObject)
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }


  getDetails(staffId: number, currentDate: any): Observable<any> { 
    const time = new Date(currentDate)
    const timeYear = time.getFullYear()
    const timeMonth = String(time.getMonth() + 1).padStart(2, '0')
    const timeDay = String(time.getDate()).padStart(2, '0')

    const startDate = new Date(time.getTime() - 30 * 24 * 60 * 60 * 1000)
    const startYear = startDate.getFullYear()
    const startMonth = String(startDate.getMonth() + 1).padStart(2, '0')
    const startDay = String(startDate.getDate()).padStart(2, '0')

    const formattedStartDate = `${startYear}-${startMonth}-${startDay}`

    const formattedStartTime = `${timeYear}-${timeMonth}-${timeDay}`
    
    let jsonObject = {
      "requestObject":{
        "staff": staffId,
        "start": formattedStartDate,
        "end": formattedStartTime
        },
        "requestService":"GET_STAFF_SHIFT_DETAILS"
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
