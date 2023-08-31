import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { GetPremiseAppointmentsService } from 'src/app/services/appointments/get-premise-appointments.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GetPremiseLeaveRequestsService } from 'src/app/services/leave-req/get-premise-leave-requests.service';
import { GetAllPremisesService } from 'src/app/services/premise/get-all-premises.service';
import { CurrentPremiseService } from 'src/app/services/shared/current-premise.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  selected!: Date | null;
  activeUser!: any
  premises: any [] = []
  currentPremise!: any
  showingPremiseId!: any
  premiseAppointments: any [] = []
  currentDate!: any
  storedPremise!: any
  premiseId!: number


  private userCurrentPremiseSubject: BehaviorSubject<any> = new BehaviorSubject(null)
  currentPremiseData$: Observable<any> = this.userCurrentPremiseSubject.asObservable()


  constructor(
    private router:Router,
    private getAllPremisesService: GetAllPremisesService,
    private authService: AuthService,
    private getPremiseAppointmntService:GetPremiseAppointmentsService,
    private getPremiseLeaveReqServices: GetPremiseLeaveRequestsService,
    private currentPremiseService:CurrentPremiseService
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

       this.premiseId = this.storedPremise?.premise_id
    })


    this.currentDate = new Date() 
    //get user premises    
    this.getAllPremisesService.getPremises(this.activeUser?.accountId).subscribe((res: any) => {
      if(res.statusCode === 702) {
        this.premises = res.message 
        let item = localStorage.getItem('currentPremise') 

        if(item) {
          this.currentPremise = JSON.parse(item)
          this.currentPremiseService.currentPremiseSubject.next(JSON.stringify(this.currentPremise))
          // this.userCurrentPremiseSubject.next(this.currentPremise)
          this.showingPremiseId = this.currentPremise.premise_id
          console.log(this.showingPremiseId)
        } else {
          this.currentPremise = this.premises[0] 
          this.showingPremiseId = this.currentPremise.premise_id
          console.log(this.showingPremiseId)
          this.currentPremiseService.currentPremiseSubject.next(this.currentPremise)
          // this.userCurrentPremiseSubject.next(this.currentPremise)
          localStorage.setItem('currentPremise', JSON.stringify(this.currentPremise))
        }        
      }


      // this.getPremiseAppointmntService.getPremiseAppointments(this.premiseId).subscribe((res) => {
      //   console.log(res)
      //   this.premiseAppointments = res.message
      // })


      // this.getPremiseLeaveReqServices.getDetails(this.currentDate, this.storedPremise.premise_id).subscribe((res) => {
      //   console.log(res)
      // })

      
    })    
    
    //get premise appointments 
  }
}
