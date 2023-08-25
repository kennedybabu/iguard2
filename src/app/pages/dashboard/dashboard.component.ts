import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GetAllPremisesService } from 'src/app/services/premise/get-all-premises.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  selected!: Date | null;
  activeUser!: any
  premises!:any

  constructor(private router:Router,
    private getAllPremisesService: GetAllPremisesService,
    private authService: AuthService){
      this.authService.userData$.subscribe((res) => {
        let user = res
        this.activeUser = JSON.parse(user) 

        console.log(this.activeUser)
      })
    }

  change(){
    this.router.navigate(['companies'])
  }  


  ngOnInit(): void {
    //get user premises 
    this.getAllPremisesService.getPremises(this.activeUser?.accountId).subscribe((res: any) => {
      if(res.statusCode === 702) {
        this.premises = res.message 
      }
    })
  }


}
