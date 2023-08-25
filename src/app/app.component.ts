import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  user!:any 


  constructor(private authService:AuthService){
    this.authService.userData$.subscribe((res) => {

      this.user = JSON.parse(res)
      console.log(this.user)
    })
  }

  title = 'app';
  openedSidebar:boolean = false

  toggleNavbar(){
    this.openedSidebar = !this.openedSidebar
  }


}
