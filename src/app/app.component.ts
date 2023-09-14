import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { NotificationService } from './services/shared/notification.service';
import { NavigationHistoryService } from './services/shared/navigation-history.service';
import { CurrentPremiseService } from './services/shared/current-premise.service';
import { Router } from '@angular/router';
import { GetAccountsService } from './services/accounts/get-accounts.service';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { GetPremiseCompaniesService } from './services/company/get-premise-companies.service';
import { FlatTreeControl } from '@angular/cdk/tree';

interface PremiseNode {
  name: string,
  children?: CompanyNode []
}

interface CompanyNode {
  name: string
}


interface Permission{
  role_name: string
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  user!:any
  errorNotification!: string
  successNotification!: string

  currentPremise!: any 
  currentPremiseId!: number
  userPermission:any [] = []

  title = 'iguard';

  permission!: any

  private _transformer = (node: PremiseNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );


  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  constructor(
    public navigationHistoryService: NavigationHistoryService,
    public authService:AuthService,
    private notificationService:NotificationService,
    private currentPremiseService: CurrentPremiseService,
    private router:Router,
    private getPremiseCompaniesService:GetPremiseCompaniesService,
    
    ){

    this.navigationHistoryService.startSaveHistory()

    this.authService.userData$.subscribe((res) => {
      this.user = JSON.parse(res)

      this.userPermission = this.user?.permissions

      this.permission = this.userPermission?.map((item: Permission) => {
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


  ngOnInit(): void {
    this.getPremiseCompaniesService.getCompanies(this.currentPremiseId).subscribe((res) => {
      console.log(res.message)
      this.dataSource.data = res.message
    })    
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  
  openedSidebar:boolean = false

  toggleNavbar(){
    this.openedSidebar = !this.openedSidebar
  }


  logout(){
    localStorage.removeItem('ulpSaH5wx1pO!E')
    localStorage.removeItem('currentPremise')
    window.location.reload()
    this.router.navigate(['login'])
  }


  viewPremiseCompanies() {
    this.router.navigate(['companies', this.currentPremiseId])
  }

  viewPremiseNotifications(){
    this.router.navigate(['notifications', this.currentPremiseId])
  }


}
