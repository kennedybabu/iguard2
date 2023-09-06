import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CreateCompanyLeaveService } from 'src/app/services/company/create-company-leave.service';
import { NotificationService } from 'src/app/services/shared/notification.service';

@Component({
  selector: 'app-create-company-leave',
  templateUrl: './create-company-leave.component.html',
  styleUrls: ['./create-company-leave.component.scss']
})
export class CreateCompanyLeaveComponent { 

  userId!: number
  companyId!: number


  constructor(private createCompanyLeaveService: CreateCompanyLeaveService,
    private notificationsService:NotificationService,
    private dialogRef: MatDialogRef<CreateCompanyLeaveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService:AuthService){
      this.companyId = data.companyId

      this.authService.userData$.subscribe((res)=> {
        let user = JSON.parse(res)

        this.userId = user?.userId
      })
    }

  leaveForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required) 
  }) 


  onFormSubmit(){
    this.createCompanyLeaveService.createLeave(this.leaveForm.value, this.userId,this.companyId ).subscribe((res) => {
      if(res.statusCode === 702){
        this.notificationsService.sendSuccessMessage('leave type created')
        this.dialogRef.close()
      } else {
        this.notificationsService.sendErrorMessage('Something went wrong, try again')
      }
    })
  }

  closeDialog(){
    this.dialogRef.close()
  }    

}
