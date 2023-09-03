import { Component, OnInit } from '@angular/core';
import { GetPremiseAppointmentsService } from 'src/app/services/appointments/get-premise-appointments.service';
import { ChangeAppointmentStatusService } from 'src/app/services/notifications/change-appointment-status.service';
import { CurrentPremiseService } from 'src/app/services/shared/current-premise.service';
import { NotificationService } from 'src/app/services/shared/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  userId!: number
  premiseId!: number
  premiseAppointments: any [] = []

  constructor(
    private changeAppointmentStatusService:ChangeAppointmentStatusService,
    private notificationService:NotificationService,
    private currentPremiseService: CurrentPremiseService,
    private getPremiseAppointmentsService:GetPremiseAppointmentsService
  ){
    this.currentPremiseService.premiseData$.subscribe((res) => {
      this.premiseId = JSON.parse(res)?.premise_id
    })
  }


  ngOnInit(): void {
    this.getPremiseAppointmentsService.getPremiseAppointments(this.premiseId).subscribe((res) => {
      this.premiseAppointments = res.message.info
    })
  }


  approveAppoinment(id: number, status: string) {
    this.changeAppointmentStatusService.changeStatus(id, status, this.userId).subscribe((res) => {
      if(res.statusCode === 702){
        this.notificationService.sendSuccessMessage(res.message)
      } else {
        this.notificationService.sendErrorMessage(res.message)
      }
    })
  }

}
