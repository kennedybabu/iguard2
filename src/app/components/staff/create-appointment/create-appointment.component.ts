import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CurrentPremiseService } from 'src/app/services/shared/current-premise.service';
import { NotificationService } from 'src/app/services/shared/notification.service';
import { CreateAppointmentService } from 'src/app/services/staff/create-appointment.service';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss']
})
export class CreateAppointmentComponent {
  premiseId!: number
  staffId!:number
  departmentId!: number

  constructor(
    private notificationService:NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CreateAppointmentComponent>,
    private currentPremiseService: CurrentPremiseService,
    private createAppointmentService:CreateAppointmentService)
  {
    this.departmentId = data.departmentId

    this.currentPremiseService.premiseData$.subscribe((res) => {
      this.premiseId = JSON.parse(res)?.premise_id
    })
  }


  createAppointmentForm = new FormGroup({
    visitor_name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    msisdn: new FormControl('', Validators.required),
    narration: new FormControl('', Validators.required),
    appointment_start: new FormControl(''),
    duration: new FormControl(''),
    repeat: new FormControl('', Validators.required)
  })

  createAppointment() {
    this.createAppointmentService.createAppointment(this.createAppointmentForm.value, this.staffId, this.premiseId).subscribe((res) => {
      if(res.statusCode === 702) {
        this.notificationService.sendSuccessMessage('appointment created')
        this.dialogRef.close()
        this.createAppointmentForm.reset()
      } else if(res.statusCode === 700 || res.statusCode === 701) {
        this.notificationService.sendErrorMessage('something went wrong try again')
      }
    })
  }

  closeDialog(){
    this.dialogRef.close()
  }

}
