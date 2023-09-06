import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { NotificationService } from './services/shared/notification.service';
import { NavigationHistoryService } from './services/shared/navigation-history.service';
import { CurrentPremiseService } from './services/shared/current-premise.service';
import { Router } from '@angular/router';
import { GetAccountsService } from './services/accounts/get-accounts.service';

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
  userPermission:any [] = []

  title = 'iguard';

  permission!: any

  constructor(
    public navigationHistoryService: NavigationHistoryService,
    public authService:AuthService,
    private notificationService:NotificationService,
    private currentPremiseService: CurrentPremiseService,
    private router:Router,
    private getAccountsService: GetAccountsService
    ){

    this.navigationHistoryService.startSaveHistory()

    this.authService.userData$.subscribe((res) => {
      this.user = JSON.parse(res)

      this.userPermission = this.user?.permissions

      this.permission = this.userPermission.map((item: any) => {
        return item['role_name']
      })
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


  update(){
    this.getAccountsService.getAccounts().subscribe((res) => {
      console.log('logged')
    })
  }

  
  openedSidebar:boolean = false

  toggleNavbar(){
    this.openedSidebar = !this.openedSidebar
  }


  logout(){
    localStorage.removeItem('ulpSaH5wx1pO!E')
    localStorage.removeItem('currentPremise')
    this.update()
    this.router.navigate(['login'])
  }


  viewPremiseCompanies() {
    this.router.navigate(['companies', this.currentPremiseId])
  }

  viewPremiseNotifications(){
    this.router.navigate(['notifications', this.currentPremiseId])
  }


}
