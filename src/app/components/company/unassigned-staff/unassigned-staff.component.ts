import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Staff } from 'src/app/model/staff';

@Component({
  selector: 'app-unassigned-staff',
  templateUrl: './unassigned-staff.component.html',
  styleUrls: ['./unassigned-staff.component.scss']
})
export class UnassignedStaffComponent implements OnInit, AfterViewInit  {

  @Input() companyId!: number

  constructor(private router:Router){}

  displayedColumns: string[] = ['firstName', 'msisdn', 'email', 'designation', 'fingerprint', 'action'];
  dataSource = new MatTableDataSource<Staff>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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

  viewStaffProfile(id: number){
    this.router.navigate(['staff-profile', id])
  }

}
