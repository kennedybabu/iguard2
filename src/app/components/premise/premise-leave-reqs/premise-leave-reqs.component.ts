import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Staff } from 'src/app/model/staff';
import { GetPremiseLeaveRequestsService } from 'src/app/services/leave-req/get-premise-leave-requests.service';
import { ChangeLeaveReqsStatusService } from 'src/app/services/notifications/change-leave-reqs-status.service';
import { NotificationService } from 'src/app/services/shared/notification.service';

@Component({
  selector: 'app-premise-leave-reqs',
  templateUrl: './premise-leave-reqs.component.html',
  styleUrls: ['./premise-leave-reqs.component.scss']
})
export class PremiseLeaveReqsComponent implements OnInit, AfterViewInit {

  @Input() premiseId!: number

  premiseLeaveRequests: any [] = []

  currentDate!: any

  displayedColumns: string[] = ['staff_name', 'reason', 'requested_from', 'status', 'action'];
  dataSource = new MatTableDataSource<Staff>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private getPremiseLeaveReqsService:GetPremiseLeaveRequestsService,
    private changeLeaveReqsStatusService:ChangeLeaveReqsStatusService,
    private notificationService:NotificationService,
    private  getPremiseLeaveReqServices:GetPremiseLeaveRequestsService){}

  ngOnInit(): void {
    this.currentDate = new Date()  


    this.getPremiseLeaveReqsService.getDetails(this.currentDate, this.premiseId).subscribe((res)=> {
      console.log(this.premiseId, res)
      this.dataSource.data = res.message.info
    })
    
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  approveLeave(reqid:number, action:string){
    this.changeLeaveReqsStatusService.changeStatus(reqid, action).subscribe((res) => {
      if(res.statusCode === 702){
        this.notificationService.sendSuccessMessage(res.message)
        this.getPremiseLeaveReqServices.getDetails(this.currentDate, this.premiseId).subscribe((res) => {
          this.dataSource.data = res.message.info
        })
      } else {
        this.notificationService.sendErrorMessage('something went wrong,try again')

      }
    })
  }



}
