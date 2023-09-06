import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateCompanyShiftService } from 'src/app/services/company/create-company-shift.service';
import { GetCompanyDeptsService } from 'src/app/services/company/get-company-depts.service';
import { CurrentPremiseService } from 'src/app/services/shared/current-premise.service';
import { NotificationService } from 'src/app/services/shared/notification.service';

@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.scss']
})
export class AddShiftComponent implements OnInit {

  selectedDays: any [] = [] 
  isChecked: boolean = false
  mondayChecked!: boolean
  tuesdayChecked!: boolean
  wednesdayChecked!: boolean
  thursdayChecked!: boolean
  fridayChecked!: boolean
  saturdayChecked!: boolean
  sundayChecked!: boolean
  premiseId!:number
  premiseDepts: any [] = []  
  selectedDepartmentId!: number 
  companyDepartments: any [] = []
  companyId!: number  
  currentPremise!:any
  companyDepts: any [] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef: MatDialogRef<AddShiftComponent>,
    private notificationService:NotificationService,
    private createCompanyShiftService: CreateCompanyShiftService,
    private currentPremiseService:CurrentPremiseService,
    private getCompanyDepartmentsService:GetCompanyDeptsService){

      this.currentPremiseService.premiseData$.subscribe((res) => {
        this.currentPremise = JSON.parse(res) 
        this.premiseId = this.currentPremise?.premise_id
      })

      this.companyDepartments = data.companyDepartments
      this.companyId = data.companyId
    }


    ngOnInit(): void {
      this.getCompanyDepartmentsService.getDepartments(this.companyId).subscribe((res) => {
        this.companyDepartments = res.message
      })
  
    }

    createShiftForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      start: new FormControl('', Validators.required),
      end: new FormControl(''),
      type: new FormControl(''),
      department:new FormControl('')
    })

     
    updateSelectedDays(event: any){
      if(event.target.checked == true) {
        this.selectedDays.push(event.target.value) 
      } else {
        return
      }
    }


    onStaffShiftSubmit(){
      this.createCompanyShiftService.createStaffShift(this.createShiftForm.value, this.premiseId, this.selectedDays, this.companyId).subscribe((res) => {
        if(res.statusCode === 702) {
          this.notificationService.sendSuccessMessage('shift added') 
          this.createShiftForm.reset()
          this.dialogRef.close()
        } else {
          this.notificationService.sendErrorMessage('something went wrong, try again')
        }
      })
    }


    closeDialog(){
      this.dialogRef.close()
    }    
}
