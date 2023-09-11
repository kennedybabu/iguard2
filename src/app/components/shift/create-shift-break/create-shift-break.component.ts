import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/shared/notification.service';
import { CreateShiftBreakService } from 'src/app/services/shift/create-shift-break.service';

@Component({
  selector: 'app-create-shift-break',
  templateUrl: './create-shift-break.component.html',
  styleUrls: ['./create-shift-break.component.scss']
})
export class CreateShiftBreakComponent {


  shiftId!: number

  constructor(
    private createShiftBreakService:CreateShiftBreakService,
    public dialogRef: MatDialogRef<CreateShiftBreakComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService:NotificationService
  ){
    this.shiftId = data.shiftId
  }


  shiftBreakForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })


  onFormSubmit(){
    this.createShiftBreakService.addBreak(this.shiftBreakForm.value, this.shiftId).subscribe((res) => {
      if(res.statusCode === 702) {
        this.notificationService.sendSuccessMessage('break added')
        this.dialogRef.close()
      } else {
        this.notificationService.sendErrorMessage('try again, somegthing went wrong')
      }
    })
  }


  closeDialog(){
    this.dialogRef.close()
  }

}
