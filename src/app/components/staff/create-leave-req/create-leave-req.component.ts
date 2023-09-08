import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/shared/notification.service';
import { CreateLeaveReqService } from 'src/app/services/staff/create-leave-req.service';
import { CurrentPremiseService } from 'src/app/services/shared/current-premise.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetPremiseAppointmentTagsService } from 'src/app/services/premise/get-premise-appointment-tags.service';
import { GetCompanyLeaveTypesService } from 'src/app/services/company/get-company-leave-types.service';

@Component({
  selector: 'app-create-leave-req',
  templateUrl: './create-leave-req.component.html',
  styleUrls: ['./create-leave-req.component.scss']
})
export class CreateLeaveReqComponent implements OnInit {


  staffId!: number
  premiseId!: number
  leave : boolean = false
  premiseTags: any [] = []
  companyId!: number
  leaveTypes: any [] = []


  constructor(
    private createLeaveReqService:CreateLeaveReqService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<CreateLeaveReqComponent>,
    private currentPremiseService: CurrentPremiseService,
    private getCompanyLeaveTypesService:GetCompanyLeaveTypesService){
      this.currentPremiseService.premiseData$.subscribe((res) => {
        this.premiseId = JSON.parse(res)?.premise_id
        })

        this.companyId = data.companyId

      console.log(this.leave)
    }


    // if(res.statusCode === 700){
    //   this.notificationService.sendSuccessMessage('leave created')
    //   this.dialogRef.close()
    // } else {
    //   this.notificationService.sendErrorMessage('something went wrong, please try again')
    // }

  ngOnInit(): void {
    //get company leave types
    this.getCompanyLeaveTypesService.getLeaveTypes(this.companyId).subscribe((res) => {
      console.log(this.companyId, res)
      this.leaveTypes = res.message
    })
  }

  leaveForm = new FormGroup({
    reason: new FormControl('',  Validators.required),
    name: new FormControl('',  Validators.required),
    from: new FormControl('',  Validators.required),
    to: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    time_day: new FormControl('', Validators.required)
  })


  onSubmit(){

    console.log('called start')
    this.createLeaveReqService.createLeave(this.leaveForm.value, this.staffId, this.premiseId).subscribe((res) => {
      console.log('called middel')
      if(res.statusCode === 702){
        console.log('called end')
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


  isLeaveMoreThanADay(){
    this.leave = !this.leave 
    console.log(this.leave)
  }


}
