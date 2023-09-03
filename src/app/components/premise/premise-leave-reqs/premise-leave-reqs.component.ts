import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Staff } from 'src/app/model/staff';
import { GetPremiseLeaveRequestsService } from 'src/app/services/leave-req/get-premise-leave-requests.service';

@Component({
  selector: 'app-premise-leave-reqs',
  templateUrl: './premise-leave-reqs.component.html',
  styleUrls: ['./premise-leave-reqs.component.scss']
})
export class PremiseLeaveReqsComponent implements OnInit, AfterViewInit {

  @Input() premiseId!: number

  premiseLeaveRequests: any [] = []

  displayedColumns: string[] = ['firstName', 'msisdn', 'email', 'designation', 'fingerprint'];
  dataSource = new MatTableDataSource<Staff>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private getPremiseLeaveReqsService:GetPremiseLeaveRequestsService){}

  ngOnInit(): void {
    
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



}
