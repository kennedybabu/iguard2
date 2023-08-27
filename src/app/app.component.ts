import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Subscription } from 'rxjs';
import { NotificationService } from './services/shared/notification.service';
import { NavigationHistoryService } from './services/shared/navigation-history.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  user!:any 
  private getSuccessMsgSub!: Subscription
  private getErrorMsgSub!: Subscription

  errorNotification!: string
  successNotification!: string



  constructor(
    public navigationHistoryService: NavigationHistoryService,
    private authService:AuthService,
    private notificationService:NotificationService){

      this.navigationHistoryService.startSaveHistory()

    this.authService.userData$.subscribe((res) => {

      this.user = JSON.parse(res)
    })



    //subscribe to success and error messages
    this.getErrorMsgSub = this.notificationService.getMessage().subscribe((message) => {
      this.errorNotification = message

      setTimeout(() => {
        this.errorNotification = ''
      }, 2000)
    })

    this.getSuccessMsgSub = this.notificationService.getSuccessMsg().subscribe((messsage) => {
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
    this.authService.logout()
  }


}
