import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Appointment } from 'src/app/model/appointment';
import { Premise } from 'src/app/model/premise';
import { GetPremiseAppointmentsService } from 'src/app/services/appointments/get-premise-appointments.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GetPremiseLeaveRequestsService } from 'src/app/services/leave-req/get-premise-leave-requests.service';
import { GetAllPremisesService } from 'src/app/services/premise/get-all-premises.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  selected!: Date | null;
  activeUser!: any
  premises: Premise [] = []
  currentPremise!: any
  showingPremiseId!: any
  premiseAppointments: Appointment [] = []
  currentDate!: any
  storedPremise!: any


  private userCurrentPremiseSubject: BehaviorSubject<any> = new BehaviorSubject(null)
  currentPremiseData$: Observable<any> = this.userCurrentPremiseSubject.asObservable()


  constructor(
    private router:Router,
    private getAllPremisesService: GetAllPremisesService,
    private authService: AuthService,
    private getPremiseAppointmntService:GetPremiseAppointmentsService,
    private getPremiseLeaveReqServices: GetPremiseLeaveRequestsService,
    ){
      this.authService.userData$.subscribe((res) => {
        let user = res
        this.activeUser = JSON.parse(user)
      })


      
    }
    
    change(){
      this.router.navigate(['companies'])
    }  


    viewPremiseCompanies() {
      this.router.navigate(['companies', this.currentPremise.premise_id])
    }
    
    
    ngOnInit(): void {

    this.currentPremiseData$.subscribe((res) => {
       this.storedPremise = res
    })


    this.currentDate = new Date() 
    //get user premises    
    this.getAllPremisesService.getPremises(this.activeUser?.accountId).subscribe((res: any) => {
      if(res.statusCode === 702) {
        this.premises = res.message 
        let item = localStorage.getItem('currentPremise') 

        if(item) {
          this.currentPremise = JSON.parse(item)
          this.userCurrentPremiseSubject.next(this.currentPremise)
          this.showingPremiseId = this.currentPremise.premise_id
          console.log(this.showingPremiseId)
        } else {
          this.currentPremise = this.premises[0] 
          this.showingPremiseId = this.currentPremise.premise_id
          this.userCurrentPremiseSubject.next(this.currentPremise)
          localStorage.setItem('currentPremise', JSON.stringify(this.currentPremise))
        }        
      }


      this.getPremiseAppointmntService.getPremiseAppointments(this.storedPremise.premise_id).subscribe((res) => {
        this.premiseAppointments = res.message
      })


      this.getPremiseLeaveReqServices.getDetails(this.currentDate, this.storedPremise.premise_id).subscribe((res) => {
        console.log(res)
      })

      
    })    
    
    //get premise appointments 
  }
}
