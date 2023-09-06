import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/shared/notification.service';
import { CreateLeaveReqService } from 'src/app/services/staff/create-leave-req.service';
import { CurrentPremiseService } from 'src/app/services/shared/current-premise.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-leave-req',
  templateUrl: './create-leave-req.component.html',
  styleUrls: ['./create-leave-req.component.scss']
})
export class CreateLeaveReqComponent {


  staffId!: number
  premiseId!: number


  constructor(
    private createLeaveReqService:CreateLeaveReqService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<CreateLeaveReqComponent>,
    private currentPremiseService: CurrentPremiseService){
      this.currentPremiseService.premiseData$.subscribe((res) => {
        this.premiseId = JSON.parse(res)?.premise_id
      })
    }

  leaveForm = new FormGroup({
    reason: new FormControl('',  Validators.required),
    name: new FormControl('',  Validators.required),
    from: new FormControl('',  Validators.required),
    to: new FormControl('', Validators.required)
  })


  onSubmit(){
    this.createLeaveReqService.createLeave(this.leaveForm.value, this.staffId, this.premiseId).subscribe((res) => {
      if(res.statusCode === 702){
        this.notificationService.sendSuccessMessage('requested leave successfully')
        this.dialogRef.close()
      } else {
        this.notificationService.sendErrorMessage('something went wrong, try again')
      }
    })
  }

  get reason(){
    return this.leaveForm.get('reason')
  }

  get name(){
    return this.leaveForm.get('name')
  }

  get from(){
    return this.leaveForm.get('from')
  }

  get to(){
    return this.leaveForm.get('to')
  }

  closeDialog(){
    this.dialogRef.close()
  }


}
