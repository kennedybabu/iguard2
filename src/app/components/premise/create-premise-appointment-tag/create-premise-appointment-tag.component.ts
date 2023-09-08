import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreatePremiseAppointmentTagService } from 'src/app/services/premise/create-premise-appointment-tag.service';
import { NotificationService } from 'src/app/services/shared/notification.service';

@Component({
  selector: 'app-create-premise-appointment-tag',
  templateUrl: './create-premise-appointment-tag.component.html',
  styleUrls: ['./create-premise-appointment-tag.component.scss']
})
export class CreatePremiseAppointmentTagComponent {

  premiseId!: number

  constructor(
    private createPremiseAppointmentTagService: CreatePremiseAppointmentTagService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef: MatDialogRef<CreatePremiseAppointmentTagComponent>,
    private notificationService:NotificationService
  ){
    this.premiseId = data.premiseId

  }

  tagForm = new FormGroup({
    access: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })


  onSubmit(){
    this.createPremiseAppointmentTagService.createTag(this.tagForm.value, this.premiseId).subscribe((res) => {
      if(res.statusCode === 702) {
        this.notificationService.sendSuccessMessage('Appointment tag created')
        this.dialogRef.close()
      } else {
        this.notificationService.sendErrorMessage('Something went wrong, try again')
      }
    })
  }


  closeDialog(){
    this.dialogRef.close()
  }

}
