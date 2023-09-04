import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Appointment } from 'src/app/model/appointment';
import { GetPremiseAppointmentsService } from 'src/app/services/appointments/get-premise-appointments.service';
import { GetPremiseLeaveRequestsService } from 'src/app/services/leave-req/get-premise-leave-requests.service';
import { ChangeAppointmentStatusService } from 'src/app/services/notifications/change-appointment-status.service';
import { ChangeLeaveReqsStatusService } from 'src/app/services/notifications/change-leave-reqs-status.service';
import { CurrentPremiseService } from 'src/app/services/shared/current-premise.service';
import { NotificationService } from 'src/app/services/shared/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  premiseId!: number
  premiseAppointments: any [] = []
  premiseLeaveRequest: any []= []
  currentDate!: any

  displayedColumns: string[] = ['visitor', 'start', 'msisdn', 'status', 'action'];
  dataSource = new MatTableDataSource<Appointment>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  constructor(
    private changeAppointmentStatusService:ChangeAppointmentStatusService,
    private notificationService:NotificationService,
    private currentPremiseService: CurrentPremiseService,
    private getPremiseAppointmentsService:GetPremiseAppointmentsService,
    private changeLeaveReqsStatusService:ChangeLeaveReqsStatusService,
    private getPremiseLeaveReqServices: GetPremiseLeaveRequestsService
  ){
    this.currentPremiseService.premiseData$.subscribe((res) => {
      this.premiseId = JSON.parse(res)?.premise_id
    })
  }


  ngOnInit(): void {
    this.currentDate = new Date()


    this.getPremiseAppointmentsService.getPremiseAppointments(this.premiseId).subscribe((res) => {
      this.premiseAppointments = res.message.info
      
    })
  }


  approveAppoinment(id: number, status: string) {
    this.changeAppointmentStatusService.changeStatus(id, status).subscribe((res) => {
      if(res.statusCode === 702){
        this.notificationService.sendSuccessMessage(res.message)
      } else {
        this.notificationService.sendErrorMessage(res.message)
      }
    })
  }

  approveLeave(reqid:number, action:string){
    this.changeLeaveReqsStatusService.changeStatus(reqid, action).subscribe((res) => {
      if(res.statusCode === 702){
        this.notificationService.sendSuccessMessage(res.message)
        this.getPremiseLeaveReqServices.getDetails(this.currentDate, this.premiseId).subscribe((res) => {
          this.premiseLeaveRequest = res.message.info
        })
      } else {
        this.notificationService.sendErrorMessage('something went wrong,try again')
        
      }
    })
  }

}
