import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { NotificationService } from './services/shared/notification.service';
import { NavigationHistoryService } from './services/shared/navigation-history.service';
import { CurrentPremiseService } from './services/shared/current-premise.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  user!:any
  errorNotification!: string
  successNotification!: string

  currentPremise!: any 
  currentPremiseId!: number




  constructor(
    public navigationHistoryService: NavigationHistoryService,
    private authService:AuthService,
    private notificationService:NotificationService,
    private currentPremiseService: CurrentPremiseService,
    private router:Router
    ){

    this.navigationHistoryService.startSaveHistory()

    this.authService.userData$.subscribe((res) => {
      this.user = JSON.parse(res)
    })



    this.currentPremiseService.premiseData$.subscribe((res) => {
      this.currentPremise = JSON.parse(res)
      this.currentPremiseId = this.currentPremise?.premise_id    

    })



    //subscribe to success and error messages
    this.notificationService.getMessage().subscribe((message) => {
        this.errorNotification = message

        setTimeout(() => {
          this.errorNotification = ''
        }, 2000)
      })

    this.notificationService.getSuccessMsg().subscribe((messsage) => {
        this.successNotification = messsage

        setTimeout(() => {
          this.successNotification = ''
        }, 2000)
      }) 


  }

  title = 'app';
  openedSidebar:boolean = false

  toggleNavbar(){
    this.openedSidebar = !this.openedSidebar
  }


  logout(){
    this.router.navigate(['login'])
    localStorage.removeItem('ulpSaH5wx1pO!E')
    localStorage.removeItem('currentPremise')

  }


  viewPremiseCompanies() {
    this.router.navigate(['companies', this.currentPremiseId])
  }


}
